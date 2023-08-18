import { PropertyFakeBuilder } from "#property/domain";

import { CRM } from "./crm.interface";
import { HubspotCRM } from "./hubspot.crm";

describe("Hubspot CRM", () => {
  let crm: CRM;
  beforeEach(() => {
    crm = new HubspotCRM();
  });

  it("should create a property", async () => {
    const property = PropertyFakeBuilder.aProperty().build();
    await expect(() => crm.createProperty(property)).resolves.not.toThrow();
  });
});
