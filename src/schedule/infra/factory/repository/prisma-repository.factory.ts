import { Connection, PrismaClient } from "#shared/infra";

import { RepositoryFactory } from "../../../domain/factory";
import {
  SchedulePrismaRepository,
  CalendarPrismaRepository
} from "../../repository";

export class PrismaRepositoryFactory implements RepositoryFactory {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = Connection.getInstance();
  }
  createScheduleRepository() {
    return new SchedulePrismaRepository(this.prisma);
  }

  createCalendarRepository() {
    return new CalendarPrismaRepository(this.prisma);
  }
}
