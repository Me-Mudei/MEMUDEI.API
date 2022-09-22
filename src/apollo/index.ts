import NexusSchema from "./infra/schema/nexus.schema";
import ApolloServer from "./infra/server/apollo.server";
import { Context } from "./context";

const schema = new NexusSchema();
const context = new Context();

const server = new ApolloServer(schema, context);
server.listen(parseInt(process.env.PORT || "4000"));
