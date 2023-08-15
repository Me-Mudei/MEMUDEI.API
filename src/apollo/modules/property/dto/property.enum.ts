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

export const ScheduleStatus = enumType({
  name: "schedule_status",
  members: ["pending", "confirmed", "rejected", "cancelled", "finished"]
});
