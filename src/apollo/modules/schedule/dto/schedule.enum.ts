import { enumType } from "nexus";

export const ScheduleStatus = enumType({
  name: "schedule_status",
  members: ["pending", "confirmed", "rejected", "cancelled", "finished"]
});
