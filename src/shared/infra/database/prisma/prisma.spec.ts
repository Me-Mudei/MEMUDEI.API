import { Connection } from '../';
describe('Prisma connection', () => {
  it('should connect to the database with Prisma Client', async () => {
    const prisma = Connection.getInstance();

    await prisma.$connect();
    expect(prisma).toBeTruthy();
  });
});
