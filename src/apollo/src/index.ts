import NexusSchemaAdapter from "./infra/schema/NexusSchemaAdapter";
import ApolloServerAdapter from "./infra/server/ApolloServerAdapter";
import Context from "./context";
import PrismaRepositoryFactory from "./infra/factory/PrismaRepositoryFactory";
import Broker from "../../@core/@shared/infra/broker/broker";

const schema = new NexusSchemaAdapter();
const repositoryFactory = new PrismaRepositoryFactory();
const broker = new Broker();

const context = new Context(repositoryFactory, broker);

const server = new ApolloServerAdapter(schema, context);
server.listen(process.env.PORT || 4000);
