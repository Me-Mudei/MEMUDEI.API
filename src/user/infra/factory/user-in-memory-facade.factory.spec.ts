import { UserInMemoryFacadeFactory } from "./user-in-memory-facade.factory";

describe("UserInMemoryFacadeFactory Unit tests", () => {
  it("should create a user facade", async () => {
    const facade = UserInMemoryFacadeFactory.create();
    const spyFacadeCreate = jest.spyOn(facade, "createUser");
    await facade.createUser({
      name: "Test",
      email: "tes@test.com"
    });
    expect(spyFacadeCreate).toHaveBeenCalledTimes(1);
  });
});
