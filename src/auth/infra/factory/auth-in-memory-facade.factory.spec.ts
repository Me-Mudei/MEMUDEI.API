import { AuthInMemoryFacadeFactory } from "./auth-in-memory-facade.factory";

describe("AuthInMemoryFacadeFactory Unit tests", () => {
  it("should create a auth facade", async () => {
    const facade = AuthInMemoryFacadeFactory.create();
    const spyFacadeCreate = jest.spyOn(facade, "signUp");
    await facade.signUp({
      name: "Test",
      email: "tes@test.com",
    });
    expect(spyFacadeCreate).toHaveBeenCalledTimes(1);
  });
});
