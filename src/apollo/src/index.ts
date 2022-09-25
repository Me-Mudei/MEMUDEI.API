import { APIGatewayEvent, Callback, Context as AwsContext } from 'aws-lambda';
import NexusSchema from './infra/schema/nexus.schema';
import ApolloLambdaServer from './infra/server/apollo-lambda.server';
import { Context } from './context';

const schema = new NexusSchema();
const context = new Context();

/*
 * Apollo Server
 * const server = new ApolloServer(schema, context);
 * server.listen(parseInt(process.env.PORT || "4000"));
 */

export const handler = async (
  event: APIGatewayEvent,
  ctx: AwsContext,
  callback: Callback<any>,
) => {
  const server = new ApolloLambdaServer(schema, context);
  const handler = await server.listen();
  return handler(
    { ...event, requestContext: event.requestContext || {} },
    ctx,
    callback,
  );
};
