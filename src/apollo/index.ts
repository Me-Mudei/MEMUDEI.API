import { Context } from './context';
import NexusSchema from './schema';
import ApolloServer from './server/apollo.server';

const schema = NexusSchema.makeSchema();
const context = new Context();

export const server = new ApolloServer(schema, context);
