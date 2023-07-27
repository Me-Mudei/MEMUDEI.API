import { nanoid } from "nanoid";

import { UserInMemoryRepository } from "./user-in-memory.repository";

describe("UserInMemoryRepository", () => {
  let userRepository: UserInMemoryRepository;
  beforeEach(() => {
    userRepository = new UserInMemoryRepository();
  });

  it("should be get userRO by external_id", async () => {
    const external_id = nanoid();
    userRepository["users"] = [{ id: nanoid(), external_id }];
    const user = await userRepository.getUser({ external_id });
    expect(user).toBeDefined();
  });
});
