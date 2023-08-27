import {
  CreatePropertyInput as CoreCreatePropertyInput,
  CreatePropertyOutput as CoreCreatePropertyOutput
} from "#property/app";
import { PropertyStatus as CorePropertyStatus } from "#property/domain";
import { inputObjectType, objectType } from "nexus";

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
    t.nullable.string("owner_id");
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

export const CreatePropertyOutput = objectType({
  name: "create_property_output",
  definition(t) {
    t.nonNull.string("id");
    t.nullable.field("status", { type: "property_status" });
    t.nonNull.date("created_at");
    t.nonNull.date("updated_at");
  }
});

export class CreatePropertyInputMapper {
  static async toInput(input: {
    property: any;
    user_id: string;
  }): Promise<CoreCreatePropertyInput> {
    const { owner_id, ...property } = input.property;
    return {
      ...property,
      user_id: owner_id ?? input.user_id,
      status: input.property.status as CorePropertyStatus
    };
  }
}

export class CreatePropertyOutputMapper {
  static toOutput(property: CoreCreatePropertyOutput): any {
    return {
      id: property.id,
      status: property.status as any,
      created_at: property.created_at,
      updated_at: property.updated_at
    };
  }
}
