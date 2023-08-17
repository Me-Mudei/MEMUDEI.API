import { Schedule, ScheduleStatus, User } from "#schedule/domain";
import { UniqueEntityId } from "#shared/domain";

import { CRM } from "./crm.interface";
import { HubspotCRM } from "./hubspot.crm";

describe("Hubspot CRM", () => {
  let crm: CRM;
  beforeEach(() => {
    crm = new HubspotCRM();
  });

  it("should create a visitor", async () => {
    const visitor = new User({
      name: "John Doe",
      email: "jhon.doe@mail.com",
      phone: "99999999999"
    });
    const { id } = await crm.createVisitor(visitor);
    expect(id).toBeDefined();
    await crm.deleteVisitor(id);
  });

  it("should schedule a visit", async () => {
    const visitor = new User({
      name: "John Doe",
      email: "jhon.doe@mail.com",
      phone: "99999999999"
    });
    const schedule = new Schedule({
      date_time: new Date(),
      note: "test de visita",
      property_id: new UniqueEntityId(),
      visitor,
      status: ScheduleStatus.PENDING
    });

    const { id } = await crm.createSchedule(schedule);
    expect(id).toBeDefined();
  });
});
