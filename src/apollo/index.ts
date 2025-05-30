import { Context } from "./context";
import NexusSchema from "./schema";
import ApolloServer from "./server/apollo.server";

const schema = NexusSchema.makeSchema();
const context = new Context();
const server = new ApolloServer(schema, context);

server.listen(parseInt(process.env.PORT || "3000"));
