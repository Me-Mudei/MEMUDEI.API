import { Context } from "./apollo/context";
import NexusSchema from "./apollo/schema";
import ApolloLambdaServer from "./apollo/server/apollo-lambda.server";

const schema = NexusSchema.makeSchema();
const context = new Context();
const server = new ApolloLambdaServer(schema, context);

export const handler = server.listen();
