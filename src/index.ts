import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server';
import schema from './infra/graphql/schema';
import { createContext } from './infra/graphql/context';

const server = new ApolloServer({
  schema,
  context: createContext,
});

server.listen({ port: process.env.PORT || 4000 });
