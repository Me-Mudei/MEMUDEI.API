import { ApolloServer as Apollo } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { json } from "body-parser";
import cors from "cors";
import express from "express";
import { GraphQLSchema } from "graphql";
import http from "http";
import { nanoid } from "nanoid";

import { Context } from "../context";

import Server from "./server.interface";

export default class ApolloServer implements Server<Apollo<Context>> {
  schema: GraphQLSchema;
  context: Context;
  server: Apollo<Context>;
  private _app: express.Application;
  private _httpServer: http.Server;
  constructor(schema: GraphQLSchema, context: Context) {
    this.schema = schema;
    this.context = context;
    this._app = express();
    this._httpServer = http.createServer(this._app);
    this.server = new Apollo<Context>({
      schema: this.schema,
      csrfPrevention: false,
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer: this._httpServer })
      ]
    });
  }
  async listen(port: number): Promise<void> {
    await this.server.start();
    this._app.use(
      "/graphql",
      cors<cors.CorsRequest>(),
      json(),
      expressMiddleware(this.server, {
        context: async ({ req }) =>
          this.context.getContext({
            req_id: nanoid(),
            req_path: req.url,
            req_method: req.method,
            req_ua: req.headers["user-agent"],
            headers: req.headers
          })
      })
    );

    await new Promise<void>((resolve) =>
      this._httpServer.listen({ port }, resolve)
    );
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
  }
}
