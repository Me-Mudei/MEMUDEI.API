import Context from '../context';
import { GraphQLSchema } from 'graphql';

export default interface Server<T> {
  schema: GraphQLSchema;
  context: Context;
  server: T;
  listen(port: number): Promise<void>;
}
