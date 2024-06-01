import { registerEnumType } from '@nestjs/graphql';

export type QueryMode = 'default' | 'insensitive';

export const QueryMode = {
  DEFAULT: 'default',
  INSENSITIVE: 'insensitive',
};

registerEnumType(QueryMode, { name: 'QueryMode' });
