import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import { join } from 'path';

export default class PrismaTestContext {
  prismaBinary = join(__dirname, '..', 'node_modules', '.bin', 'prisma');
  prismaClient: null | PrismaClient = null;

  constructor() {}

  async before() {
    execSync(`${this.prismaBinary} db push`);
    this.prismaClient = new PrismaClient();
    return this.prismaClient;
  }

  async after() {
    const deleteUsers = this.prismaClient!.user.deleteMany();
    const deleteAddresses = this.prismaClient!.address.deleteMany();
    const deleteRoles = this.prismaClient!.role.deleteMany();
    const deletePermissions = this.prismaClient!.permission.deleteMany();
    const deleteLocations = this.prismaClient!.location.deleteMany();
    const deleteFiles = this.prismaClient!.file.deleteMany();

    await this.prismaClient!.$transaction([
      deleteUsers,
      deleteAddresses,
      deleteRoles,
      deletePermissions,
      deleteLocations,
      deleteFiles,
    ]);
    await this.prismaClient?.$disconnect();
  }
}
