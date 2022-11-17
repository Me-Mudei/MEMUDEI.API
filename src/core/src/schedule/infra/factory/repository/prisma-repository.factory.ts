import { RepositoryFactory } from '../../../domain/factory';
import {
  SchedulePrismaRepository,
  CalendarPrismaRepository,
  PropertyPrismaRepository,
  UserPrismaRepository,
} from '../../repository';
import { Connection, PrismaClient } from '../../../../shared/infra/database';

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

  createPropertyRepository() {
    return new PropertyPrismaRepository(this.prisma);
  }

  createUserRepository() {
    return new UserPrismaRepository(this.prisma);
  }
}
