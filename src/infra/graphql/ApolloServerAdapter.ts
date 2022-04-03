import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core/dist/plugin/landingPage/graphqlPlayground';
import { GraphQLSchema } from 'graphql';
import Schema from '../schema/Schema';
import Context from './Context';
import Graphql from './Graphql';

export default class ApolloServerAdapter implements Graphql {
  schema: GraphQLSchema;
  constructor(schema: Schema, readonly context: Context) {
    this.schema = schema.getSchema();
  }
  async listen(port: any): Promise<void> {
    const server = new ApolloServer({
      schema: this.schema,
      context: ({ req }) => this.context.getContext(req),
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    });
    await server.listen({ port });
    console.log(`🚀  Server ready at http://memudei-api.lndo.site/graphql`);
  }
}
