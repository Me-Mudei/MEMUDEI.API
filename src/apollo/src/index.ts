import NexusSchema from './schema';
import { Context } from './context';
import ApolloServer from './server/apollo.server';

const schema = NexusSchema.makeSchema();
const context = new Context();
const server = new ApolloServer(schema, context);

server.listen(parseInt(process.env.PORT || '4000'));

//export const handler = async (
//  event: APIGatewayEvent,
//  ctx: AwsContext,
//  callback: Callback<any>,
//) => {
//  const server = new ApolloLambdaServer(schema, context);
//  const handler = await server.listen();
//  return handler(
//    { ...event, requestContext: event.requestContext || {} },
//    ctx,
//    callback,
//  );
//};
