import { makeSchema } from "nexus";
import Schema from "./schema.interface";
import * as types from "./types";

export default class NexusSchema implements Schema {
  constructor() {}
  makeSchema() {
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
}
