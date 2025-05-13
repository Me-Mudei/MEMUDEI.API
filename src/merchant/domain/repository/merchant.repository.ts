import { SearchParams, SearchResult } from "#shared/domain";
import { Prisma } from "#shared/infra";

import { Merchant } from "../entities";

export interface MerchantFilter {
  id?: string;
  user_id?: string;
}

export class MerchantSearchParams extends SearchParams<MerchantFilter> {
  applyFilter(filter?: MerchantFilter): Prisma.MerchantWhereInput {
    const where: Prisma.MerchantWhereInput = {};
    if (filter.id) {
      where.id = filter.id;
    }
    if (filter.user_id) {
      where.members = {
        some: {
          user_id: filter.user_id,
        },
      };
    }
    return where;
  }
}

export class MerchantSearchResult extends SearchResult<
  Merchant,
  MerchantFilter
> {}
