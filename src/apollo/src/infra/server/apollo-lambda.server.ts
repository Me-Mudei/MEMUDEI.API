import { ApolloServer } from 'apollo-server-lambda';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { GraphQLSchema } from 'graphql';
import Schema from '../schema/schema.interface';
import { Context } from '../../context';
import Server from './server.interface';

export default class ApolloLambdaServer implements Server {
  private _schema: GraphQLSchema;
  private _context: Context;
  constructor(readonly schema: Schema, readonly context: Context) {
    this._schema = schema.getSchema();
    this._context = context;
  }
  async listen(): Promise<any> {
    return new ApolloServer({
      schema: this._schema,
      context: async ({ event }) =>
        this._context.getContext(event.requestContext),
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    }).createHandler();
  }
}
