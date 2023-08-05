import { InMemorySearchableRepository } from "#shared/domain";
import { SortDirection } from "#shared/domain";

import {
  Address,
  Charge,
  CondominiumDetail,
  FloorPlan,
  Location,
  Photo,
  Property,
  PropertyDetail,
  PropertyStatus,
  Rule
} from "../../domain/entities";
import { PropertyRepository, PropertyFilter } from "../../domain/repository";

export class PropertyInMemoryRepository
  extends InMemorySearchableRepository<Property, PropertyFilter>
  implements PropertyRepository
{
  static instance: PropertyInMemoryRepository;
  sortableFields: string[] = ["title", "created_at"];

  static getInstance(): PropertyInMemoryRepository {
    if (!PropertyInMemoryRepository.instance) {
      PropertyInMemoryRepository.instance = new PropertyInMemoryRepository();
    }
    return PropertyInMemoryRepository.instance;
  }

  async update(input: any): Promise<void> {
    await this._get(input.id);
    const indexFound = this.items.findIndex((i) => i.id === input.id);
    const property = this.items[indexFound];
    property.status = input.status ?? property.status;
    property.title = input.title ?? property.title;
    property.description = input.description ?? property.description;
    property.property_type = input.property_type ?? property.property_type;
    property.property_relationship =
      input.property_relationship ?? property.property_relationship;
    property.privacy_type = input.privacy_type ?? property.privacy_type;
    property.address = new Address({
      ...property.address,
      country: input.address?.country ?? property.address.country,
      state: input.address?.state ?? property.address.state,
      city: input.address?.city ?? property.address.city,
      district: input.address?.district ?? property.address.district,
      street: input.address?.street ?? property.address.street,
      zip_code: input.address?.zip_code ?? property.address.zip_code,
      complement: input.address?.complement ?? property.address.complement,
      location: new Location({
        lat: input.address?.location?.lat ?? property.address.location.lat,
        lng: input.address?.location?.lng ?? property.address.location.lng
      })
    });
    const cleanFloorPlans = (floorPlan) =>
      !input.floor_plan?.remove?.includes(floorPlan.key);
    property.floor_plans = input.floor_plan?.update
      .filter(cleanFloorPlans)
      .map((floorPlan) => {
        return new FloorPlan({
          ...property.floor_plans.find((fp) => fp.key === floorPlan.key),
          ...floorPlan
        });
      })
      .concat(
        input.floor_plan?.insert.filter(cleanFloorPlans).map((floorPlan) => {
          return new FloorPlan({
            ...floorPlan
          });
        })
      )
      .concat(property.floor_plans.filter(cleanFloorPlans));

    const cleanPropertyDetails = (propertyDetail) =>
      !input.property_detail?.remove?.includes(propertyDetail.key);

    property.property_details = input.property_detail?.update
      .filter(cleanPropertyDetails)
      .map((propertyDetail) => {
        return new PropertyDetail({
          ...property.property_details.find(
            (pd) => pd.key === propertyDetail.key
          ),
          ...propertyDetail
        });
      })
      .concat(
        input.property_details?.insert
          .filter(cleanPropertyDetails)
          .map((propertyDetails) => {
            return new PropertyDetail({
              ...propertyDetails
            });
          })
      )
      .concat(property.property_details.filter(cleanPropertyDetails));

    const cleanCondominiumDetails = (condominiumDetail) =>
      !input.condominium_detail?.remove?.includes(condominiumDetail.key);

    property.condominium_details = input.condominium_detail?.update
      .filter(cleanCondominiumDetails)
      .map((condominiumDetail) => {
        return new CondominiumDetail({
          ...property.condominium_details.find(
            (cd) => cd.key === condominiumDetail.key
          ),
          ...condominiumDetail
        });
      })
      .concat(
        input.condominium_details?.insert
          .filter(cleanCondominiumDetails)
          .map((condominiumDetails) => {
            return new CondominiumDetail({
              ...condominiumDetails
            });
          })
      )
      .concat(property.condominium_details.filter(cleanCondominiumDetails));

    const cleanRules = (rule) => !input.rule?.remove?.includes(rule.key);
    property.rules = input.rule?.update
      .filter(cleanRules)
      .map((rule) => {
        return new Rule({
          ...property.rules.find((r) => r.key === rule.key),
          ...rule
        });
      })
      .concat(
        input.rules?.insert.filter(cleanRules).map((rules) => {
          return new Rule({
            ...rules
          });
        })
      )
      .concat(property.rules.filter(cleanRules));

    const cleanCharges = (charge) =>
      !input.charge?.remove?.includes(charge.key);
    property.charges = input.charge?.update
      .filter(cleanCharges)
      .map((charge) => {
        return new Charge({
          ...property.charges.find((c) => c.key === charge.key),
          ...charge
        });
      })
      .concat(
        input.charges?.insert.filter(cleanCharges).map((charges) => {
          return new Charge({
            ...charges
          });
        })
      )
      .concat(property.charges.filter(cleanCharges));

    const cleanPhotos = (photo) => !input.photo?.remove?.includes(photo.id);
    property.photos = input.photo?.update
      .filter(cleanPhotos)
      .map((photo) => {
        return new Photo({
          ...property.photos.find((c) => c.id === photo.id),
          ...photo
        });
      })
      .concat(
        input.photos?.insert.filter(cleanPhotos).map((photos) => {
          return new Photo({
            ...photos
          });
        })
      )
      .concat(property.charges.filter(cleanPhotos));
  }

  protected async applyFilter(
    items: Property[],
    filter: PropertyFilter
  ): Promise<Property[]> {
    if (!filter || Object.keys(filter).length === 0) {
      return items;
    }
    const ignoredKeyList = ["max_", "value_type"];
    for (const key in filter) {
      if (!filter[key] || ignoredKeyList.find((item) => key.includes(item))) {
        continue;
      }
      if (key.includes("min_")) {
        const field = key.replace("min_", "");
        if (field === "value") {
          items = this[`${field}_filter`](
            items,
            filter[`min_${field}`],
            filter[`max_${field}`],
            filter.value_type
          );
          continue;
        }
        items = this[`${field}_filter`](
          items,
          filter[`min_${field}`],
          filter[`max_${field}`]
        );
        continue;
      }
      items = this[`${key}_filter`](items, filter[key]);
    }
    return items;
  }

  rules_filter(items: Property[], keys: string[]): Property[] {
    return items.filter((item) => {
      return item.rules
        .filter((item) => item.allowed)
        .some((rule) => keys.includes(rule.key));
    });
  }

  condominium_details_filter(items: Property[], keys: string[]): Property[] {
    return items.filter((item) => {
      return item.condominium_details
        .filter((item) => item.available)
        .some((condominiumDetail) => keys.includes(condominiumDetail.key));
    });
  }

  property_details_filter(items: Property[], keys: string[]): Property[] {
    return items.filter((item) => {
      return item.property_details
        .filter((item) => item.available)
        .some((propertyDetail) => keys.includes(propertyDetail.key));
    });
  }

  privacy_type_filter(items: Property[], key: string): Property[] {
    return items.filter((item) => {
      return item.privacy_type === key;
    });
  }

  property_type_filter(items: Property[], key: string): Property[] {
    return items.filter((item) => {
      return item.property_type === key;
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
    key?: string
  ): Property[] {
    return items.filter((item) => {
      const chargeFiltered = key
        ? item.charges.filter((charge) => charge.key === key)
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
    key: string,
    min: number,
    max?: number
  ): Property[] {
    return items.filter((item) => {
      const floorPlan = item.floor_plans.find(
        (floorPlan) => floorPlan.key === key
      );

      if (!!floorPlan && floorPlan.value >= min) {
        if (max && floorPlan.value <= max) {
          return item;
        }
        return item;
      }
    });
  }

  footage_filter(items: Property[], min: number, max: number): Property[] {
    return this.floor_plans_filter(items, "footage", min, max);
  }

  qtd_bedrooms_filter(items: Property[], qtd: number): Property[] {
    return this.floor_plans_filter(items, "bedrooms", qtd);
  }

  qtd_bathrooms_filter(items: Property[], qtd: number): Property[] {
    return this.floor_plans_filter(items, "bathrooms", qtd);
  }

  protected async applySort(
    items: Property[],
    sort: string | null,
    sort_dir: SortDirection | null
  ): Promise<Property[]> {
    return !sort
      ? super.applySort(items, "created_at", "desc")
      : super.applySort(items, sort, sort_dir);
  }
}

export default PropertyInMemoryRepository;
