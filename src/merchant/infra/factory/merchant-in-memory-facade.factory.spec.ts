import { MerchantFacade } from "#merchant/app";

import { MerchantInMemoryFacadeFactory } from "./merchant-in-memory-facade.factory";

describe("MerchantInMemoryFacadeFactory unit tests", () => {
  it("should create a facade", async () => {
    const facade = MerchantInMemoryFacadeFactory.create();
    expect(facade).toBeInstanceOf(MerchantFacade);
    expect(facade).toHaveProperty("searchMerchants");
    expect(facade).toHaveProperty("getMyMerchantMember");
  });
});
