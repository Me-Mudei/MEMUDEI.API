import { HubspotCRM } from "#property/infra";
import { WinstonLogger } from "#shared/infra";

import { PropertyCreated } from "../../domain/events";

export class PropertyCreatedSendToCRMHandler {
  name = "PropertyCreated";

  async handle(event: PropertyCreated): Promise<void> {
    const crm = new HubspotCRM();
    const logger = WinstonLogger.getInstance();
    try {
      logger.info({ message: "Sending property to CRM" });
      await crm.createProperty(event.payload);
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
