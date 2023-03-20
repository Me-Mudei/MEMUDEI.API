import { APIGatewayEvent, Callback, Context as AwsContext } from 'aws-lambda';
import NexusSchema from './apollo/schema';
import ApolloLambdaServer from './apollo/server/apollo-lambda.server';
import { Context } from './apollo/context';

export const handler = async (
  event: APIGatewayEvent,
  ctx: AwsContext,
  callback: Callback<any>,
) => {
  console.log('__dirname');
  console.log(__dirname);
  const schema = NexusSchema.makeSchema();
  const context = new Context();
  const server = new ApolloLambdaServer(schema, context);
  const handler = await server.listen();
  return handler(
    { ...event, requestContext: event.requestContext || {} },
    ctx,
    callback,
  );
};
