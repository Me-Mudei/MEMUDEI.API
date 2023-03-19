import { GraphQLDateTime } from 'graphql-scalars';
import { GraphQLUpload } from 'graphql-upload';
import { asNexusMethod, scalarType } from 'nexus';

export const DateTime = asNexusMethod(GraphQLDateTime, 'date');

export const Upload = scalarType({
  name: GraphQLUpload.name,
  asNexusMethod: 'upload', // We set this to be used as a method later as `t.upload()` if needed
  description: GraphQLUpload.description,
  serialize: GraphQLUpload.serialize,
  parseValue: GraphQLUpload.parseValue,
  parseLiteral: GraphQLUpload.parseLiteral,
});
