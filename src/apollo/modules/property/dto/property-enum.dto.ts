import { enumType } from "nexus";

export const PropertyStatus = enumType({
  name: "property_status",
  members: ["pending", "completed"]
});
