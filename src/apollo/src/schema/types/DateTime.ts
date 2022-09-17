import { GraphQLDateTime } from 'graphql-scalars';
import { asNexusMethod } from 'nexus';

export default asNexusMethod(GraphQLDateTime, 'date');
