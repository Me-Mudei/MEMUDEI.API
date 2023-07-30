import { UserCreated } from "../../domain/events";

export class UserCreatedSendConfirmationHandler {
  name = "UserCreated";

  async handle(_event: UserCreated): Promise<void> {
    //TODO: send email
  }
}
