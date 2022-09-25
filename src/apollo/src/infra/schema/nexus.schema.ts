import { makeSchema } from 'nexus';
import { nexusShield, allow } from 'nexus-shield';
import { ForbiddenError } from 'apollo-server';
import Schema from './schema.interface';
import * as types from './types';
import { GraphQLSchema } from 'graphql';

export default class NexusSchema implements Schema {
  private _schema: GraphQLSchema;
  constructor() {
    this._schema = this.makeSchema();
  }
  getSchema() {
    return this._schema;
  }
  private makeSchema() {
    return makeSchema({
      types,
      plugins: [
        nexusShield({
          defaultError: new ForbiddenError('Not allowed'),
          defaultRule: allow,
        }),
      ],
      outputs: {
        schema: __dirname + '../../../generated/schema.graphql',
        typegen: __dirname + '../../../generated/nexus.d.ts',
      },
      contextType: {
        module: require.resolve('../../context'),
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
