import NexusSchemaAdapter from "./infra/schema/NexusSchemaAdapter";
import ApolloServerAdapter from "./infra/server/ApolloServerAdapter";
import Context from "./context";

const schema = new NexusSchemaAdapter();
const context = new Context();

const server = new ApolloServerAdapter(schema, context);
server.listen(process.env.PORT || 4000);
