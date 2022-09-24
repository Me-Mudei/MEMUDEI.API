import { UserCreated } from "../../domain/events";

export class UserCreatedSendConfirmationHandler {
  name = "UserCreated";

  constructor() {}

  async handle(_event: UserCreated): Promise<void> {}
}
