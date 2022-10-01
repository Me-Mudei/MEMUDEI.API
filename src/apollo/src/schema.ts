import { makeSchema } from 'nexus';
import { nexusShield, allow } from 'nexus-shield';
import { ForbiddenError } from 'apollo-server';
import * as UserModule from './user';
import * as SharedModule from './shared';

export default class NexusSchema {
  static makeSchema() {
    return makeSchema({
      types: [UserModule, SharedModule],
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
