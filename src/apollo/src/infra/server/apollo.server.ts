import { ApolloServer as Apollo } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { GraphQLSchema } from "graphql";
import Schema from "../schema/schema.interface";
import Context from "../../context";
import Server from "./server.interface";

export default class ApolloServer implements Server {
  private _schema: GraphQLSchema;
  private _context: Context;
  constructor(readonly schema: Schema, readonly context: Context) {
    this._schema = schema.makeSchema();
    this._context = context;
  }
  async listen(port: number): Promise<void> {
    const server = new Apollo({
      schema: this._schema,
      context: () => this._context.getContext(),
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    });
    await server.listen({ port });
  }
}
