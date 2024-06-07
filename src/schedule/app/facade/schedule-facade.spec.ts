import { Broker } from "#shared/infra";

import { RepositoryFactory } from "../../domain";
import { InMemoryRepositoryFactory } from "../../infra";
import { ScheduleVisitUseCase } from "../use-cases";

import { ScheduleFacade } from "./schedule.facade";

describe("ScheduleFacade Unit tests", () => {
  let scheduleVisit: ScheduleVisitUseCase;
  let repositoryFactory: RepositoryFactory;
  let broker: Broker;
  let facade: ScheduleFacade;

  beforeEach(() => {
    repositoryFactory = new InMemoryRepositoryFactory();
    broker = new Broker();
    scheduleVisit = new ScheduleVisitUseCase(repositoryFactory, broker);
    facade = new ScheduleFacade({
      scheduleVisit,
    });
  });
  it("should create a schedule facade", async () => {
    const spyFacadeCreate = jest.spyOn(facade, "scheduleVisit");
    const spyUseCaseExecute = jest.spyOn(scheduleVisit, "execute");
    const scheduleVisitProps = {
      date: new Date(),
    };
    await facade.scheduleVisit(scheduleVisitProps as any);
    expect(spyFacadeCreate).toHaveBeenCalledTimes(1);
    expect(spyUseCaseExecute).toHaveBeenCalledTimes(1);
  });
});
