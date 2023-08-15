import {
  UpdatePropertyInput as CoreUpdatePropertyInput,
  UpdatePropertyOutput as CoreUpdatePropertyOutput
} from "#property/app";
import { inputObjectType, objectType } from "nexus";

export const updatePropertyInput = inputObjectType({
  name: "update_property_input",
  definition(t) {
    t.nonNull.string("id");
    t.nullable.string("title");
    t.nullable.string("description");
    t.nullable.field("status", { type: "property_status" });
    t.nullable.string("property_type");
    t.nullable.string("property_relationship");
    t.nullable.string("privacy_type");
    t.nullable.field("address", { type: "update_property_address_input" });
    t.nullable.field("floor_plan", {
      type: "update_property_floor_plan_input"
    });
    t.nullable.field("property_detail", {
      type: "update_property_property_detail_input"
    });
    t.nullable.field("condominium_detail", {
      type: "update_property_condominium_detail_input"
    });
    t.nullable.field("rule", { type: "update_property_rule_input" });
    t.nullable.field("photo", { type: "update_property_photo_input" });
    t.nullable.field("charge", { type: "update_property_charge_input" });
  }
});

export const UpdatePropertyAddressInput = inputObjectType({
  name: "update_property_address_input",
  definition(t) {
    t.nullable.string("zip_code");
    t.nullable.string("city");
    t.nullable.string("state");
    t.nullable.string("street");
    t.nullable.string("country");
    t.nullable.field("location", { type: "update_address_location_input" });
    t.nullable.string("district");
    t.nullable.string("complement");
  }
});

export const UpdateAddressLocationInput = inputObjectType({
  name: "update_address_location_input",
  definition(t) {
    t.nullable.float("lat");
    t.nullable.float("lng");
  }
});

export const UpdatePropertyFloorPlanInput = inputObjectType({
  name: "update_property_floor_plan_input",
  definition(t) {
    t.nullable.list.nonNull.string("remove");
    t.nullable.list.nonNull.field("update", {
      type: "create_property_floor_plan_input"
    });
    t.nullable.list.nonNull.field("insert", {
      type: "create_property_floor_plan_input"
    });
  }
});

export const UpdatePropertyPropertyDetailInput = inputObjectType({
  name: "update_property_property_detail_input",
  definition(t) {
    t.nullable.list.nonNull.string("remove");
    t.nullable.list.nonNull.field("update", {
      type: "create_property_property_detail_input"
    });
    t.nullable.list.nonNull.field("insert", {
      type: "create_property_property_detail_input"
    });
  }
});

export const UpdatePropertyCondominiumDetailInput = inputObjectType({
  name: "update_property_condominium_detail_input",
  definition(t) {
    t.nullable.list.nonNull.string("remove");
    t.nullable.list.nonNull.field("update", {
      type: "create_property_condominium_detail_input"
    });
    t.nullable.list.nonNull.field("insert", {
      type: "create_property_condominium_detail_input"
    });
  }
});

export const UpdatePropertyRuleInput = inputObjectType({
  name: "update_property_rule_input",
  definition(t) {
    t.nullable.list.nonNull.string("remove");
    t.nullable.list.nonNull.field("update", {
      type: "create_property_rule_input"
    });
    t.nullable.list.nonNull.field("insert", {
      type: "create_property_rule_input"
    });
  }
});

export const UpdatePropertyChargeInput = inputObjectType({
  name: "update_property_charge_input",
  definition(t) {
    t.nullable.list.nonNull.string("remove");
    t.nullable.list.nonNull.field("update", {
      type: "create_property_charge_input"
    });
    t.nullable.list.nonNull.field("insert", {
      type: "create_property_charge_input"
    });
  }
});

export const UpdatePropertyPhotoInput = inputObjectType({
  name: "update_property_photo_input",
  definition(t) {
    t.nullable.list.nonNull.string("remove");
    t.nullable.list.nonNull.field("update", {
      type: "create_property_photo_input"
    });
    t.nullable.list.nonNull.field("insert", {
      type: "create_property_photo_input"
    });
  }
});

export const UpdatePropertyOutput = objectType({
  name: "update_property_output",
  definition(t) {
    t.nonNull.string("id");
    t.nullable.field("status", { type: "property_status" });
    t.nonNull.date("created_at");
    t.nonNull.date("updated_at");
  }
});

export class UpdatePropertyInputMapper {
  static async toInput(input: {
    property: any;
  }): Promise<CoreUpdatePropertyInput> {
    return input.property;
  }
}

export class UpdatePropertyOutputMapper {
  static toOutput(property: CoreUpdatePropertyOutput): any {
    return {
      id: property.id,
      status: property.status as any,
      created_at: property.created_at,
      updated_at: property.updated_at
    };
  }
}
