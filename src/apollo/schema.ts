import { GraphQLError } from 'graphql';
import { makeSchema } from 'nexus';
import { nexusShield, allow } from 'nexus-shield';
import { join } from 'path';
import * as TypeModules from './modules';

export default class NexusSchema {
  static makeSchema() {
    return makeSchema({
      types: [TypeModules],
      plugins: [
        nexusShield({
          defaultError: new GraphQLError('Not Authorized!', {
            extensions: {
              code: 'FORBIDDEN',
            },
          }),
          defaultRule: allow,
        }),
      ],
      outputs: {
        schema: join(__dirname, './generated/schema.graphql'),
        typegen: join(__dirname, './generated/nexus.ts'),
      },
      contextType: {
        module: require.resolve('./context'),
        export: 'Context',
      },
    });
  }
}
