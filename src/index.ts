import NexusSchemaAdapter from './infra/schema/NexusSchemaAdapter';
import ApolloServerAdapter from './infra/graphql/ApolloServerAdapter';
import Context from './infra/graphql/Context';
import { PrismaClient } from '@prisma/client';
import PrismaRepositoryFactory from './infra/factory/PrismaRepositoryFactory';
import PrismaDAOFactory from './infra/factory/PrismaDAOFactory';
import Broker from './infra/broker/Broker';

const schema = new NexusSchemaAdapter();
const prisma = new PrismaClient();
const repositoryFactory = new PrismaRepositoryFactory(prisma);
const DAOFactory = new PrismaDAOFactory(prisma);
const broker = new Broker();

const context = new Context(repositoryFactory, DAOFactory, broker);
const server = new ApolloServerAdapter(schema, context);
server.listen(process.env.PORT || 4000);
