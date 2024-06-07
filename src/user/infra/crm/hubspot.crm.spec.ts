import { User } from "#user/domain";

import { CRM } from "./crm.interface";
import { HubspotCRM } from "./hubspot.crm";

describe("Hubspot CRM", () => {
  let crm: CRM;
  beforeEach(() => {
    crm = new HubspotCRM();
  });

  it("should user a visit", async () => {
    const user = new User({
      name: "John Doe",
      email: "jhon.doe@mail.com",
    });
    await expect(() => crm.createUser(user)).rejects.toThrow();
  });
});
