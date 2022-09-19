import { makeSchema } from "nexus";
import Schema from "./Schema";
import * as types from "./types";

export default class NexusSchemaAdapter implements Schema {
  constructor() {}
  makeSchema() {
    return makeSchema({
      types,
      outputs: {
        schema: __dirname + "../../../../generated/schema.graphql",
        typegen: __dirname + "../../../../generated/nexus.ts",
      },
      contextType: {
        module: require.resolve("../graphql/context"),
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
}
