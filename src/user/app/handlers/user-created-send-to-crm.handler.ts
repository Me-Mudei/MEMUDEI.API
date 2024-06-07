import { WinstonLogger } from "#shared/infra";
import { HubspotCRM } from "#user/infra";

import { UserCreated } from "../../domain";

export class UserCreatedSendToCrmHandler {
  name = "UserCreated";

  async handle(event: UserCreated): Promise<void> {
    const crm = new HubspotCRM();
    const logger = WinstonLogger.getInstance();
    try {
      logger.info({ message: "Sending user to CRM" });
      await crm.createUser(event.payload);
      logger.info({ message: "User sent to CRM" });
    } catch (error) {
      logger.error({
        message: error.message,
        err_code: "CRM_ERROR",
        imp: "User wasn't created in CRM",
        err_category: "CRM",
      });
    }
  }
}
