import { makeSchema } from 'nexus';
import { nexusShield, allow } from 'nexus-shield';
import { ForbiddenError } from 'apollo-server';
import * as TypeModules from './modules';

export default class NexusSchema {
  static makeSchema() {
    return makeSchema({
      types: [TypeModules],
      plugins: [
        nexusShield({
          defaultError: new ForbiddenError('Not allowed'),
          defaultRule: allow,
        }),
      ],
      outputs: {
        schema: __dirname + '/generated/schema.graphql',
        typegen: __dirname + '/generated/nexus.d.ts',
      },
      contextType: {
        module: require.resolve('./context'),
        export: 'Context',
      },
    });
  }
}
