import { ScheduleCreated } from "../../domain/events";

export class ScheduledVisitSendToCRMHandler {
  name = "ScheduleCreated";

  async handle(_event: ScheduleCreated): Promise<void> {
    /**
     * TODO:Send confirmation email to scheduler
     * Email should contain:
     * - Schedule start date
     * - Schedule duration
     * - Schedule status
     * - Property address
     * - Property owner name
     * - Property owner contact info
     * - Link to cancel schedule
     */
  }
}
