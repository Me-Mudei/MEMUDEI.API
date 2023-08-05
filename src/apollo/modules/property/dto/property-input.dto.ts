import { CreatePropertyInput as CoreCreatePropertyInput } from "#property/app";
import { PropertyStatus as CorePropertyStatus } from "#property/domain";
import { inputObjectType } from "nexus";

export const CreatePropertyInput = inputObjectType({
  name: "create_property_input",
  definition(t) {
    t.nonNull.string("title");
    t.nonNull.string("description");
    t.nullable.field("status", { type: "property_status" });
    t.nonNull.field("address", { type: "create_property_address_input" });
    t.nonNull.string("property_type");
    t.nonNull.string("property_relationship");
    t.nonNull.string("privacy_type");
    t.nonNull.list.nonNull.field("floor_plans", {
      type: "create_property_floor_plan_input"
    });
    t.nonNull.list.nonNull.field("property_details", {
      type: "create_property_property_detail_input"
    });
    t.nonNull.list.nonNull.field("condominium_details", {
      type: "create_property_condominium_detail_input"
    });
    t.nonNull.list.nonNull.field("rules", {
      type: "create_property_rule_input"
    });
    t.nonNull.list.nonNull.field("charges", {
      type: "create_property_charge_input"
    });
    t.nullable.list.nonNull.field("photos", {
      type: "create_property_photo_input"
    });
  }
});

export const CreatePropertyAddressInput = inputObjectType({
  name: "create_property_address_input",
  definition(t) {
    t.nonNull.string("zip_code");
    t.nonNull.string("city");
    t.nonNull.string("state");
    t.nonNull.string("street");
    t.nonNull.string("country");
    t.nonNull.field("location", { type: "create_address_location_input" });
    t.nullable.string("district");
    t.nullable.string("complement");
  }
});

export const CreateAddressLocationInput = inputObjectType({
  name: "create_address_location_input",
  definition(t) {
    t.nonNull.float("lat");
    t.nonNull.float("lng");
  }
});

export const CreatePropertyFloorPlanInput = inputObjectType({
  name: "create_property_floor_plan_input",
  definition(t) {
    t.nonNull.string("key");
    t.nonNull.int("value");
  }
});

export const CreatePropertyPropertyDetailInput = inputObjectType({
  name: "create_property_property_detail_input",
  definition(t) {
    t.nonNull.string("key");
    t.nonNull.boolean("available");
  }
});

export const CreatePropertyCondominiumDetailInput = inputObjectType({
  name: "create_property_condominium_detail_input",
  definition(t) {
    t.nonNull.string("key");
    t.nonNull.boolean("available");
  }
});

export const CreatePropertyRuleInput = inputObjectType({
  name: "create_property_rule_input",
  definition(t) {
    t.nonNull.string("key");
    t.nonNull.boolean("allowed");
  }
});

export const CreatePropertyChargeInput = inputObjectType({
  name: "create_property_charge_input",
  definition(t) {
    t.nonNull.string("key");
    t.nonNull.int("amount");
  }
});

export const CreatePropertyPhotoInput = inputObjectType({
  name: "create_property_photo_input",
  definition(t) {
    t.nonNull.string("url");
    t.nonNull.string("filename");
    t.nonNull.string("type");
    t.nonNull.string("subtype");
    t.nonNull.int("position");
    t.nullable.string("description");
  }
});

export const GetPropertyInput = inputObjectType({
  name: "get_property_input",
  definition(t) {
    t.nonNull.string("id");
  }
});

export const PropertyFilterInput = inputObjectType({
  name: "property_filter_input",
  definition(t) {
    t.nullable.string("id");
    t.nullable.string("query");
    t.nullable.string("status");
    t.nullable.string("property_type");
    t.nullable.string("privacy_type");
    t.nullable.list.string("property_details");
    t.nullable.list.string("condominium_details");
    t.nullable.list.string("rules");
    t.nullable.string("value_type");
    t.nullable.float("min_value");
    t.nullable.float("max_value");
    t.nullable.int("min_footage");
    t.nullable.int("max_footage");
    t.nullable.int("qtd_bedrooms");
    t.nullable.int("qtd_bathrooms");
  }
});

export const PropertySearchInput = inputObjectType({
  name: "search_properties_input",
  definition(t) {
    t.nullable.int("page");
    t.nullable.int("per_page");
    t.nullable.string("sort");
    t.nullable.field("sort_dir", { type: "sort_direction" });
    t.nullable.field("filter", { type: "property_filter_input" });
  }
});

export class CreatePropertyInputMapper {
  static async toInput(input: {
    property: any;
    user_id: string;
  }): Promise<CoreCreatePropertyInput> {
    return {
      ...input.property,
      user_id: input.user_id,
      status: input.property.status as CorePropertyStatus
    };
  }
}
