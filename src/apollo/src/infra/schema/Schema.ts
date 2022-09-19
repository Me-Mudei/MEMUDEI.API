import { GraphQLSchema } from "graphql";

export default interface Schema {
  makeSchema(): GraphQLSchema;
}
