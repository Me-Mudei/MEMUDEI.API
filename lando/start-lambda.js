const lambdaLocal = require('lambda-local');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

app.use(bodyParser());

app.use(async (ctx) => {
  const req = ctx.request;
  const result = await lambdaLocal.execute({
    lambdaPath: '/app/dist/index.js',
    lambdaHandler: 'handler',
    environment: process.env,
    timeoutMs: 305000, // 5min
    event: {
      path: req.path,
      resource: req.path,
      queryStringParameters: req.query,
      httpMethod: req.method,
      headers: req.headers, // Pass on request headers
      body: req.rawBody === undefined ? '' : req.rawBody, // Pass on request body
    },
  });

  ctx.respond = false;
  ctx.res.writeHead(result.statusCode, result.headers);
  ctx.res.write(result.body);
  ctx.res.end();
});

app.listen(80);
