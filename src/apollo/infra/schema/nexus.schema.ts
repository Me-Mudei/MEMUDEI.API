import { makeSchema } from "nexus";
import { applyMiddleware, IMiddlewareGenerator } from "graphql-middleware";
import Schema from "./schema.interface";
import * as types from "./types";
import { GraphQLSchema } from "graphql";

export default class NexusSchema implements Schema {
  private _schema: GraphQLSchema;
  constructor(readonly middlewares?: IMiddlewareGenerator<any, any, any>[]) {
    this._schema = this.makeSchema();
    //@ts-ignore
    this.applyMiddleware(middlewares);
  }
  getSchema() {
    return this._schema;
  }
  private makeSchema() {
    return makeSchema({
      types,
      outputs: {
        schema: __dirname + "../../../../../generated/schema.graphql",
        typegen: __dirname + "../../../../../generated/nexus.ts",
      },
      contextType: {
        module: require.resolve("../../context"),
        export: "Context",
      },
      sourceTypes: {
        modules: [
          {
            module: "@prisma/client",
            alias: "prisma",
          },
        ],
      },
    });
  }
  private applyMiddleware(middlewares: IMiddlewareGenerator<any, any, any>[]) {
    return applyMiddleware(this._schema, ...middlewares);
  }
}
