import { makeSchema } from 'nexus';
import Schema from './Schema';
import * as types from './nexusTypes';
import { GraphQLSchema } from 'graphql';

export default class NexusSchemaAdapter implements Schema {
  schema: GraphQLSchema;
  constructor() {
    this.schema = this.makeSchema();
  }
  getSchema() {
    return this.schema;
  }
  private makeSchema() {
    return makeSchema({
      types: types,
      outputs: {
        schema: __dirname + '/../../../../schema.graphql',
        typegen: __dirname + '/generated/nexus.ts',
      },
      contextType: {
        module: require.resolve('../graphql/context'),
        export: 'Context',
      },
      sourceTypes: {
        modules: [
          {
            module: '@prisma/client',
            alias: 'prisma',
          },
        ],
      },
    });
  }
}
