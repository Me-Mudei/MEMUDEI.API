import { ApolloServer as Apollo, ApolloServerOptions } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import {
  startServerAndCreateLambdaHandler,
  handlers,
} from '@as-integrations/aws-lambda';
import { json } from 'body-parser';
import cors from 'cors';
import { Application } from 'express';
import { GraphQLSchema } from 'graphql';
import { nanoid } from 'nanoid';
import http from 'http';
import express from 'express';

import { Context } from '../context';
import { Handler } from 'aws-lambda';
import Server from '#shared/infra/server/server.interface';

export default class ApolloServer implements Server {
  context: Context;
  schema: GraphQLSchema;
  server: Apollo<Context>;

  constructor(schema: GraphQLSchema, context: Context) {
    this.schema = schema;
    this.context = context;
    this.server = new Apollo<Context>({ schema, csrfPrevention: false });
  }

  private express(): { app: Application; httpServer: http.Server } {
    const app = express();
    const httpServer = http.createServer(app);
    this.server.addPlugin(ApolloServerPluginDrainHttpServer({ httpServer }));
    return { app, httpServer };
  }

  async listen(port: number): Promise<void> {
    const { app, httpServer } = this.express();
    await this.server.start();
    app.use(
      '/graphql',
      cors<cors.CorsRequest>(),
      json(),
      expressMiddleware(this.server, {
        context: async ({ req }) =>
          this.context.getContext({
            req_id: nanoid(),
            req_path: req.url,
            req_method: req.method,
            req_ua: req.headers['user-agent'],
            headers: req.headers,
          }),
      }),
    );
    await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  }

  handler(): Handler {
    return startServerAndCreateLambdaHandler(
      this.server,
      handlers.createAPIGatewayProxyEventRequestHandler(),
      {
        context: async ({ event }) => {
          return this.context.getContext({
            req_id: nanoid(),
            req_path: '/graphql',
            req_method: 'POST',
            req_ua: event.headers['user-agent'],
            headers: event.headers,
          });
        },
      },
    );
  }
}
