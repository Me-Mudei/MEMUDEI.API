import { objectType } from "nexus";

export const UserOutput = objectType({
  name: "user_output",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("name");
    t.nonNull.string("email");
    t.nonNull.date("created_at");
    t.nonNull.date("updated_at");
  }
});

export const UsersPaginationOutput = objectType({
  name: "users_pagination_output",
  definition(t) {
    t.nonNull.list.field("items", { type: "user_output" });
    t.nonNull.int("total");
    t.nonNull.int("current_page");
    t.nonNull.int("last_page");
    t.nonNull.int("per_page");
  }
});

export const ValidateUserOutput = objectType({
  name: "validate_user_output",
  definition(t) {
    t.nonNull.boolean("already_exists");
    t.nullable.field("deny", { type: "deny_output" });
  }
});

export const DenyOutput = objectType({
  name: "deny_output",
  definition(t) {
    t.nonNull.string("reason");
    t.nonNull.string("user_facing_message");
  }
});
