import { makeSchema } from "nexus";
import { join } from "path";

import * as TypeModules from "./modules";
import * as Plugins from "./plugins";

export default class NexusSchema {
  static makeSchema() {
    return makeSchema({
      types: [TypeModules, Plugins],
      plugins: [Plugins.shieldPlugin, Plugins.cachePlugin],
      outputs: {
        schema: join(__dirname, "./generated/schema.graphql"),
        typegen: join(__dirname, "./generated/nexus.ts"),
      },
      contextType: {
        module: require.resolve("./context"),
        export: "Context",
      },
    });
  }
}
