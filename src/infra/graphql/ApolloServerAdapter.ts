import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core/dist/plugin/landingPage/graphqlPlayground';
import { GraphQLSchema } from 'graphql';
import Schema from '../schema/Schema';
import Context from './Context';
import Graphql from './Graphql';

export default class ApolloServerAdapter implements Graphql {
  server: ApolloServer;
  schema: GraphQLSchema;
  constructor(schema: Schema, readonly context: Context) {
    this.schema = schema.getSchema();
    this.server = new ApolloServer({
      schema: this.schema,
      context,
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    });
  }
  listen(port: any): void {
    this.server.listen({ port }).then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
    });
  }
}
