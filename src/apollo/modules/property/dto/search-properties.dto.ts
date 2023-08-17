import { inputObjectType, objectType } from "nexus";

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

export const PropertiesPaginationOutput = objectType({
  name: "properties_pagination_output",
  definition(t) {
    t.nonNull.list.field("items", { type: "property_output" });
    t.nonNull.int("total");
    t.nonNull.int("current_page");
    t.nonNull.int("last_page");
    t.nonNull.int("per_page");
  }
});
