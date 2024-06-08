import { PrismaClient } from "@prisma/client";
import { PropertyFakeBuilder } from "#property/domain";
import { Connection } from "#shared/infra";

import { CRM } from "./crm.interface";
import { HubspotCRM } from "./hubspot.crm";

describe("Hubspot CRM", () => {
  let crm: CRM;
  let prisma: PrismaClient;
  beforeEach(() => {
    prisma = Connection.getInstance("prismock");
    crm = new HubspotCRM(prisma);
  });

  it("should create a property", async () => {
    const property = PropertyFakeBuilder.aProperty().build();
    await expect(() => crm.createProperty(property)).resolves.not.toThrow();
  });
});
