import { makeSchema } from 'nexus';
import Schema from './Schema';
import { GraphQLSchema } from 'graphql';
import * as types from './types';

export default class NexusSchemaAdapter implements Schema {
  private schema: GraphQLSchema;
  constructor() {
    this.schema = this.makeSchema();
  }
  getSchema() {
    return this.schema;
  }
  private makeSchema() {
    return makeSchema({
      types,
      outputs: {
        schema: __dirname + '../../../../generated/schema.graphql',
        typegen: __dirname + '../../../../generated/nexus.ts',
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
