import { ApolloServer as Apollo } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { json } from 'body-parser';

import { GraphQLSchema } from 'graphql';
import { Context } from '../context';
import Server from './server.interface';
import { nanoid } from 'nanoid';
import { graphqlUploadExpress } from 'graphql-upload';

export default class ApolloServer implements Server {
  private _schema: GraphQLSchema;
  private _context: Context;
  private _app: express.Application;
  private _httpServer: http.Server;
  constructor(readonly schema: GraphQLSchema, readonly context: Context) {
    this._schema = schema;
    this._context = context;
    this._app = express();
    this._httpServer = http.createServer(this._app);
  }
  async listen(port: number): Promise<void> {
    const server = new Apollo<Context>({
      schema: this._schema,
      csrfPrevention: false,
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer: this._httpServer }),
      ],
    });
    await server.start();
    this._app.use(
      '/graphql',
      cors<cors.CorsRequest>(),
      json(),
      graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
      expressMiddleware(server, {
        context: async ({ req }) =>
          this._context.getContext({
            req_id: nanoid(),
            req_path: req.url,
            req_method: req.method,
            req_ua: req.headers['user-agent'],
          }),
      }),
    );

    await new Promise<void>((resolve) =>
      this._httpServer.listen({ port }, resolve),
    );
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
  }
}

/* import { ApolloServer as Apollo } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
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
    const server = new Apollo<Context>({
      schema: this._schema,
    });
    const { url } = await startStandaloneServer(server, {
      context: async ({ req }) => {
        console.log(req);
        return this._context.getContext({
          req_id: nanoid(),
          req_path: req.url,
          req_method: req.method,
          req_ua: req.headers['user-agent'],
        });
      },
      listen: { port },
    });
    console.log(`🚀 Server ready at ${url}`);
  }
}*/
