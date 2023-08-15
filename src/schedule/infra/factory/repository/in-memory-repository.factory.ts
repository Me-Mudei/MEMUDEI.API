import { RepositoryFactory } from "../../../domain/factory";
import { ScheduleInMemoryRepository } from "../../repository";

export class InMemoryRepositoryFactory implements RepositoryFactory {
  createScheduleRepository() {
    return new ScheduleInMemoryRepository();
  }
}
