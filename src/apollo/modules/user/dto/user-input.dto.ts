import { inputObjectType } from "nexus";

export const CreateUserInput = inputObjectType({
  name: "create_user_input",
  definition(t) {
    t.nonNull.string("email");
    t.nonNull.string("name");
    t.nullable.string("external_id");
    t.nullable.string("password");
  }
});

export const UserFilterInput = inputObjectType({
  name: "user_filter_input",
  definition(t) {
    t.nullable.string("id");
    t.nullable.string("name");
    t.nullable.string("email");
    t.nullable.string("external_id");
    t.nullable.string("property_id");
  }
});

export const UserSearchInput = inputObjectType({
  name: "search_users_input",
  definition(t) {
    t.nullable.int("page");
    t.nullable.int("per_page");
    t.nullable.string("sort");
    t.nullable.field("sort_dir", { type: "sort_direction" });
    t.nullable.field("filter", { type: "user_filter_input" });
  }
});

export const ValidateUserInput = inputObjectType({
  name: "validate_user_input",
  definition(t) {
    t.nonNull.string("email");
    //t.nullable.string('external_id');
  }
});
