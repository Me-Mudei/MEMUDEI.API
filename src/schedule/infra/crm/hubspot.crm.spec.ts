import { Crm } from "./crm.interface";
import { HubspotCrm } from "./hubspot.crm";

describe("Hubspot CRM", () => {
  let crm: Crm;
  beforeEach(() => {
    crm = new HubspotCrm();
  });

  it("should create a user", async () => {
    const { id } = await crm.createUser({
      name: "John Doe",
      email: "jhon.doe@mail.com",
      phone: "99999999999"
    });
    expect(id).toBeDefined();
    await crm.deleteUser(id);
  });
});
