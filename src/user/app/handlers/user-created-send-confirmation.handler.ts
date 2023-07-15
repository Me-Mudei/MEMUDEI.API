import { UserCreated } from "../../domain/events";

export class UserCreatedSendConfirmationHandler {
  name = "UserCreated";

  async handle(event: UserCreated): Promise<void> {
    console.log("EVENT HANDLE", event);
  }
}
