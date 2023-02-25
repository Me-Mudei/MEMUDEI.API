import { ApolloServer as Apollo } from '@apollo/server';
import { beforeEach, afterEach } from 'node:test';
import ApolloServer from '../../../server/apollo.server';
import NexusSchema from '../../../schema';
import Context from '../../../context';
import { GraphQLSchema } from 'graphql';

export class ApolloTestContext {
  schema: GraphQLSchema;
  context: Context;
  server: ApolloServer;
  testType: 'int' | 'e2e';

  constructor(testType: 'int' | 'e2e', context: Context) {
    this.testType = testType;
    this.context = context;
    this.schema = NexusSchema.makeSchema();
    this.server = new ApolloServer(this.schema, this.context);
  }

  async makeClient() {
    if (this.testType === 'int') {
      return this.server.server;
    }
    if (this.testType === 'e2e') {
      const port = 6000;
      await this.server.listen(port);
      return `http://localhost:${port}/graphql`;
    }
  }

  async stopServer() {
    if (this.testType === 'e2e') {
      await this.server.server.stop();
    }
  }
}
