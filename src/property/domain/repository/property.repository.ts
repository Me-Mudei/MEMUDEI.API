import { Prisma } from "@prisma/client";
import { SearchParams, SearchResult } from "#shared/domain";

import { Property } from "../entities";

export type PropertyFilter = Prisma.PropertyWhereInput;

export class PropertySearchParams extends SearchParams<PropertyFilter> {}

export class PropertySearchResult extends SearchResult<
  Property,
  PropertyFilter
> {}
