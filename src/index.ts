import NexusSchemaAdapter from './infra/schema/NexusSchemaAdapter';
import ApolloServerAdapter from './infra/graphql/ApolloServerAdapter';
import Context from './infra/graphql/Context';

const schema = new NexusSchemaAdapter();
const server = new ApolloServerAdapter(schema.getSchema(), new Context());
server.listen(process.env.PORT || 4000);
