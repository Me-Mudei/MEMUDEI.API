import { InMemorySearchableRepository } from '#shared/domain';
import { SortDirection } from '#shared/domain';
import { Property, PropertyStatus } from '../../../domain/entities';
import { PropertyRepository, PropertyFilter } from '../../../domain/repository';

export class PropertyInMemoryRepository
  extends InMemorySearchableRepository<Property, PropertyFilter>
  implements PropertyRepository
{
  sortableFields: string[] = ['title', 'created_at'];

  protected async applyFilter(
    items: Property[],
    filter: PropertyFilter,
  ): Promise<Property[]> {
    if (!filter || Object.keys(filter).length === 0) {
      return items;
    }
    const ignoredKeyList = ['max_', 'value_type'];
    for (const key in filter) {
      if (filter[key]) {
        if (ignoredKeyList.find((item) => key.includes(item))) {
          continue;
        }
        if (key.includes('min_')) {
          const field = key.replace('min_', '');
          if (field === 'value') {
            items = this[`${field}_filter`](
              items,
              filter[`min_${field}`],
              filter[`max_${field}`],
              filter.value_type,
            );
            continue;
          }
          items = this[`${field}_filter`](
            items,
            filter[`min_${field}`],
            filter[`max_${field}`],
          );
          continue;
        }
        items = this[`${key}_filter`](items, filter[key]);
      }
    }
    return items;
  }

  rules_filter(items: Property[], rules: string[]): Property[] {
    return items.filter((item) => {
      return item.rules
        .filter((item) => item.allowed)
        .some((rule) => rules.includes(rule.name));
    });
  }

  condominium_details_filter(
    items: Property[],
    condominiumDetails: string[],
  ): Property[] {
    return items.filter((item) => {
      return item.condominium_details
        .filter((item) => item.available)
        .some((condominiumDetail) =>
          condominiumDetails.includes(condominiumDetail.name),
        );
    });
  }

  property_details_filter(
    items: Property[],
    propertyDetails: string[],
  ): Property[] {
    return items.filter((item) => {
      return item.property_details
        .filter((item) => item.available)
        .some((propertyDetail) =>
          propertyDetails.includes(propertyDetail.name),
        );
    });
  }

  privacy_type_filter(items: Property[], privacyType: string): Property[] {
    return items.filter((item) => {
      return item.privacy_type.name === privacyType;
    });
  }

  property_type_filter(items: Property[], propertyType: string): Property[] {
    return items.filter((item) => {
      return item.property_type.name === propertyType;
    });
  }

  query_filter(items: Property[], query: string): Property[] {
    if (query.length < 3) return items;
    return items.filter((item) => {
      return (
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
    });
  }

  id_filter(items: Property[], id: string): Property[] {
    return items.filter((item) => {
      return item.id === id;
    });
  }

  status_filter(items: Property[], status: PropertyStatus): Property[] {
    return items.filter((item) => {
      return item.status === status;
    });
  }

  value_filter(
    items: Property[],
    min: number,
    max: number,
    valueType?: string,
  ): Property[] {
    return items.filter((item) => {
      const chargeFiltered = valueType
        ? item.charges.filter((charge) => charge.name === valueType)
        : item.charges;
      if (chargeFiltered.length <= 0) {
        return;
      }
      const total = chargeFiltered
        .map((charge) => charge.amount)
        .reduce((acc, charge) => {
          return acc + charge;
        });
      if (total >= min && total <= max) {
        return item;
      }
    });
  }

  private floor_plans_filter(
    items: Property[],
    name: string,
    min: number,
    max?: number,
  ): Property[] {
    return items.filter((item) => {
      const floorPlan = item.floor_plans.find(
        (floorPlan) => floorPlan.name === name,
      );

      if (!!floorPlan && floorPlan.quantity >= min) {
        if (max && floorPlan.quantity <= max) {
          return item;
        }
        return item;
      }
    });
  }

  area_filter(items: Property[], min: number, max: number): Property[] {
    return this.floor_plans_filter(items, 'area', min, max);
  }

  qtd_bedrooms_filter(items: Property[], qtd: number): Property[] {
    return this.floor_plans_filter(items, 'bedrooms', qtd);
  }

  qtd_bathrooms_filter(items: Property[], qtd: number): Property[] {
    return this.floor_plans_filter(items, 'bathrooms', qtd);
  }

  protected async applySort(
    items: Property[],
    sort: string | null,
    sort_dir: SortDirection | null,
  ): Promise<Property[]> {
    return !sort
      ? super.applySort(items, 'created_at', 'desc')
      : super.applySort(items, sort, sort_dir);
  }
}

export default PropertyInMemoryRepository;
