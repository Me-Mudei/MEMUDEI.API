import { HubspotCRM } from "#schedule/infra/crm";
import { WinstonLogger } from "#shared/infra";

import { ScheduleCreated } from "../../domain/events";

export class ScheduledVisitSendToCRMHandler {
  name = "ScheduleCreated";

  async handle(event: ScheduleCreated): Promise<void> {
    const crm = new HubspotCRM();
    const logger = WinstonLogger.getInstance();
    try {
      logger.info({ message: "Sending schedule to CRM" });
      await crm.createSchedule(event.payload);
      logger.info({ message: "Schedule sent to CRM" });
    } catch (error) {
      logger.error({
        message: error.message,
        err_code: "CRM_ERROR",
        imp: "Scheduling wasn't created in CRM",
        err_category: "CRM"
      });
    }
  }
}
