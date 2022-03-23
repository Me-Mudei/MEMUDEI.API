import { PrismaClient } from '@prisma/client';
import UserDAO from '../../app/dao/UserDAO';
import DAOFactory from '../../domain/factory/DAOFactory';
import UserPrismaDAO from '../dao/UserPrismaDAO';

export default class PrismaDAOFactory implements DAOFactory {
  constructor(private readonly prisma: PrismaClient) {}
  createUserDAO(): UserDAO {
    return new UserPrismaDAO(this.prisma);
  }
}
