import NexusSchemaAdapter from './infra/schema/NexusSchemaAdapter';
//import ApolloServerAdapter from './infra/graphql/ApolloServerAdapter';
import ApolloServerLambdaAdapter from './infra/graphql/ApolloServerLambdaAdapter';
import { APIGatewayEvent, Callback, Context as AwsContext } from 'aws-lambda';
import Context from '../context';
import PrismaRepositoryFactory from './infra/factory/PrismaRepositoryFactory';
import Broker from './infra/broker';

const schema = new NexusSchemaAdapter();
const repositoryFactory = new PrismaRepositoryFactory();
const broker = new Broker();

const context = new Context(repositoryFactory, broker);
/**
 * Adapter for Graphql ApolloServer
 * const server = new ApolloServerAdapter(schema, context);
 * server.listen(process.env.PORT || 4000);
 */

export const handler = async (
  event: APIGatewayEvent,
  ctx: AwsContext,
  callback: Callback<any>
) => {
  const server = new ApolloServerLambdaAdapter(schema, context);
  const handler = await server.listen();
  return handler(
    { ...event, requestContext: event.requestContext || {} },
    ctx,
    callback
  );
};
