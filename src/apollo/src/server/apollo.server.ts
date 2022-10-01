import { ApolloServer as Apollo } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { GraphQLSchema } from 'graphql';
import { Context } from '../context';
import Server from './server.interface';
import { nanoid } from 'nanoid';

export default class ApolloServer implements Server {
  private _schema: GraphQLSchema;
  private _context: Context;
  constructor(readonly schema: GraphQLSchema, readonly context: Context) {
    this._schema = schema;
    this._context = context;
  }
  async listen(port: number): Promise<void> {
    const server = new Apollo({
      schema: this._schema,
      context: ({ req }) =>
        this._context.getContext({
          req_id: nanoid(),
          req_path: req.path,
          req_method: req.method,
          req_ua: req.headers['user-agent'],
        }),
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    });
    const { url } = await server.listen({ port });
    console.log(`🚀 Server ready at ${url}`);
  }
}
