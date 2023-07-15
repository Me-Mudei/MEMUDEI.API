import { APIGatewayEvent, Callback, Context as AwsContext } from "aws-lambda";

import { Context } from "./apollo/context";
import NexusSchema from "./apollo/schema";
import ApolloLambdaServer from "./apollo/server/apollo-lambda.server";

export const handler = async (
  event: APIGatewayEvent,
  ctx: AwsContext,
  callback: Callback<any>
) => {
  const schema = NexusSchema.makeSchema();
  const context = new Context();
  const server = new ApolloLambdaServer(schema, context);
  const handler = await server.listen();
  return handler(
    { ...event, requestContext: event.requestContext || {} },
    ctx,
    callback
  );
};
