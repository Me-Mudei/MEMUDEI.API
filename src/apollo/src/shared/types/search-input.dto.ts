import { enumType, inputObjectType, objectType, extendInputType } from 'nexus';

export const SearchInput = inputObjectType({
  name: 'search_input',
  definition(t) {
    t.nullable.int('page');
    t.nullable.int('per_page');
    t.nullable.string('sort');
    t.nullable.field('sort_dir', { type: 'sort_direction' });
  },
});

export const DefaultSearchInput = extendInputType({
  type: 'search_input',
  definition(t) {
    t.string('filter');
  },
});

export const PaginationOutputDto = objectType({
  name: 'pagination_output',
  definition(t) {
    t.nonNull.list.field('items', { type: 'property_output' });
    t.nonNull.int('total');
    t.nonNull.int('current_page');
    t.nonNull.int('last_page');
    t.nonNull.int('per_page');
  },
});

export const SortDirection = enumType({
  name: 'sort_direction',
  members: ['asc', 'desc'],
});
