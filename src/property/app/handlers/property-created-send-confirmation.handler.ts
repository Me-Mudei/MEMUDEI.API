import { PropertyCreated } from "../../domain/events";

export class PropertyCreatedSendConfirmationHandler {
  name = "PropertyCreated";

  async handle(_event: PropertyCreated): Promise<void> {
    //TODO: send email
  }
}
