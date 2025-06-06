import { ApolloServer as Apollo } from "@apollo/server";
import {
  startServerAndCreateLambdaHandler,
  handlers
} from "@as-integrations/aws-lambda";
import { GraphQLSchema } from "graphql";
import { nanoid } from "nanoid";

import { Context } from "../context";

import Server from "./server.interface";

export default class ApolloLambdaServer implements Server<Apollo<Context>> {
  schema: GraphQLSchema;
  context: Context;
  server: Apollo<Context>;
  constructor(schema: GraphQLSchema, context: Context) {
    this.schema = schema;
    this.context = context;
    this.server = new Apollo<Context>({
      schema: this.schema
    });
  }
  listen() {
    return startServerAndCreateLambdaHandler(
      this.server,
      handlers.createAPIGatewayProxyEventRequestHandler(),
      {
        context: async ({ event }) => {
          return this.context.getContext({
            req_id: nanoid(),
            req_path: "/graphql",
            req_method: "POST",
            req_ua: event.headers["user-agent"],
            headers: event.headers
          });
        },
        // TODO: middleware Access-Control-Allow-Origin
        middleware: [
          async (event) => {
            return async (result) => {
              result.headers = {
                ...result.headers,
                "Access-Control-Allow-Origin": "*"
              };
            };
          }
        ]
      }
    );
  }
}
