import { ApolloServer } from 'apollo-server-lambda';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { GraphQLSchema } from 'graphql';
import Schema from '../schema/Schema';
import Context from './context';
import Graphql from './Graphql';

export default class ApolloServerAdapter implements Graphql {
  schema: GraphQLSchema;
  constructor(schema: Schema, readonly context: Context) {
    this.schema = schema.getSchema();
  }
  async listen(): Promise<any> {
    const server = new ApolloServer({
      schema: this.schema,
      context: ({ express: { req } }) => this.context.getContext(req),
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    }).createHandler();
    return server;
  }
}
