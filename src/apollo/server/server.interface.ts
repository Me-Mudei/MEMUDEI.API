import { GraphQLSchema } from "graphql";

import Context from "../context";

export default interface Server<T> {
  schema: GraphQLSchema;
  context: Context;
  server: T;
  listen(port: number): any;
}
