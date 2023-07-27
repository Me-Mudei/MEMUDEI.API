import { PropertyCreated } from "../../domain/events";

export class PropertyCreatedSendConfirmationHandler {
  name = "PropertyCreated";

  async handle(event: PropertyCreated): Promise<void> {
    console.log("EVENT HANDLE", event);
  }
}
