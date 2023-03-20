const lambdaLocal = require('lambda-local');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

app.use(bodyParser());

app.use(async (ctx) => {
  const req = ctx.request;
  const result = await lambdaLocal.execute({
    lambdaPath: '/app/.build/main',
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

// Express implementation below in case we need to switch
// const express = require('express')
// const bodyParser = require('body-parser')
// const app = express()

// app.use('*', async (req, res) => {
//     console.log('req.headers', req.headers)
//     console.log('typeof req.body', typeof req.body)
//     console.log('req.body', req.body  + '')
//     console.log('req.method', req.method)
//     const result = await lambdaLocal
//         .execute({
//             lambdaPath: '/app/src/services/app',
//             lambdaHandler: 'router',
//             environment: process.env,
//             event: {
//                 path: '/healthcheck',
//                 resource: '/healthcheck',
//                 queryStringParameters: req.query,
//                 httpMethod: 'GET',
//                 headers: req.headers, // Pass on request headers
//                 body: req.body === undefined ? '' : req.body  // Pass on request body
//             }
//         })
//
//     // Respond to HTTP request
//     res
//         .status(result.statusCode)
//         .set(result.headers)
//         .send(result.body)
// })
//
// // Process body as plain text as this is
// // how it would come from API Gateway
// app.use(bodyParser.text({type:"*/*"}))
//
// app.listen(80, () => console.log('listening on port: 80'))
