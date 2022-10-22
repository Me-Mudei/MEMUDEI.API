import { ApolloServer as Apollo } from '@apollo/server';
import { startServerAndCreateLambdaHandler } from '@as-integrations/aws-lambda';
import { GraphQLSchema } from 'graphql';
import { nanoid } from 'nanoid';
import { Context } from '../context';
import Server from './server.interface';

export default class ApolloLambdaServer implements Server {
  private _schema: GraphQLSchema;
  private _context: Context;
  constructor(readonly schema: GraphQLSchema, readonly context: Context) {
    this._schema = schema;
    this._context = context;
  }
  async listen(): Promise<any> {
    const server = new Apollo<Context>({
      schema: this._schema,
    });

    return startServerAndCreateLambdaHandler(server, {
      context: async ({ event }) => {
        console.log(event);
        return this._context.getContext({
          req_id: nanoid(),
          req_path: '/graphql',
          req_method: 'POST',
          req_ua: event.headers['user-agent'],
        });
      },
    });
  }
}
