import { enumType } from "nexus";

export const PropertyStatus = enumType({
  name: "property_status",
  members: [
    "pending",
    "in_progress",
    "published",
    "rejected",
    "unpublished",
    "deactivated"
  ]
});
