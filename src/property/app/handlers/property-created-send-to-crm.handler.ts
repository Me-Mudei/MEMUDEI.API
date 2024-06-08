import { WinstonLogger } from "#shared/infra";

import { PropertyCreated } from "../../domain";
import { CRM } from "../../infra";

export class PropertyCreatedSendToCRMHandler {
  name = "PropertyCreated";

  constructor(readonly crm: CRM) {}

  async handle(event: PropertyCreated): Promise<void> {
    const logger = WinstonLogger.getInstance();
    try {
      logger.info({ message: "Sending property to CRM" });
      await this.crm.createProperty(event.payload);
      logger.info({ message: "Property sent to CRM" });
    } catch (error) {
      logger.error({
        message: error.message,
        err_code: "CRM_ERROR",
        imp: "Property wasn't created in CRM",
        err_category: "CRM",
      });
    }
  }
}
