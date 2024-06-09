import { SearchParams, SearchResult } from "#shared/domain";
import { Prisma } from "#shared/infra";

import { DetailType, Property } from "../entities";

export interface PropertyFilter {
  id?: string;
  query?: string;
  status?: string;
  property_type?: string;
  property_details?: string[];
  condominium_details?: string[];
  rules?: string[];
  lat?: number;
  lng?: number;
  radius?: number;
  value_type?: string;
  min_value?: number;
  max_value?: number;
  min_footage?: number;
  max_footage?: number;
  qtd_bedrooms?: number;
  qtd_bathrooms?: number;
}

export class PropertySearchParams extends SearchParams<PropertyFilter> {
  applyFilter(filter?: PropertyFilter): Prisma.PropertyWhereInput {
    const where: Prisma.PropertyWhereInput = {};
    const detailSomeAnd: Prisma.DetailWhereInput[] = [];
    if (filter.id) {
      where.id = filter.id;
    }
    if (filter.query) {
      where.OR = [
        { title: { contains: filter.query } },
        { description: { contains: filter.query } },
      ];
    }
    if (filter.status) {
      where.status = filter.status;
    }
    if (filter.property_type) {
      where.property_type = filter.property_type;
    }
    if (filter.property_details) {
      detailSomeAnd.push({
        type: DetailType.PROPERTY,
        key: { in: filter.property_details },
        available: true,
      });
    }
    if (filter.condominium_details) {
      detailSomeAnd.push({
        type: DetailType.CONDOMINIUM,
        key: { in: filter.condominium_details },
        available: true,
      });
    }
    if (filter.rules) {
      detailSomeAnd.push({
        type: DetailType.RULE,
        key: { in: filter.rules },
        available: true,
      });
    }
    if (filter.min_value && filter.max_value && filter.value_type) {
      detailSomeAnd.push({
        type: DetailType.CHARGE,
        key: filter.value_type,
        value: {
          gte: filter.min_value,
          lte: filter.max_value,
        },
      });
    }
    if (filter.min_footage && filter.max_footage) {
      detailSomeAnd.push({
        type: DetailType.FLOOR_PLAN,
        key: "footage",
        value: {
          gte: filter.min_footage,
          lte: filter.max_footage,
        },
      });
    }
    if (filter.qtd_bedrooms) {
      detailSomeAnd.push({
        type: DetailType.FLOOR_PLAN,
        key: "qtd_bedrooms",
        value: {
          gte: filter.qtd_bedrooms,
        },
      });
    }
    if (filter.qtd_bathrooms) {
      detailSomeAnd.push({
        type: DetailType.FLOOR_PLAN,
        key: "qtd_bathrooms",
        value: {
          gte: filter.qtd_bathrooms,
        },
      });
    }
    return where;
  }
}

export class PropertySearchResult extends SearchResult<
  Property,
  PropertyFilter
> {}
