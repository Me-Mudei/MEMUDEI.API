import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core/dist/plugin/landingPage/graphqlPlayground';
import { GraphQLSchema } from 'graphql';
import Context from './Context';
import Graphql from './Graphql';

export default class ApolloServerAdapter implements Graphql {
  server: ApolloServer;
  constructor(readonly schema: GraphQLSchema, readonly context: Context) {
    this.server = new ApolloServer({
      schema,
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
