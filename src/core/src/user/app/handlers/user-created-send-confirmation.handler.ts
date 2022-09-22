import UserCreated from "../../domain/events/user-created.event";

export default class UserCreatedSendConfirmationHandler {
  name = "UserCreated";

  constructor() {}

  async handle(_event: UserCreated): Promise<void> {}
}
