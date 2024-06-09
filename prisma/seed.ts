import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.orgRole.createMany({
    data: [
      { name: "owner", description: "Owner of the organization" },
      { name: "manager", description: "Manager of the organization" },
      { name: "member", description: "Member of the organization" },
      { name: "guest", description: "Guest of the organization" },
    ],
  });
  await prisma.globalRole.createMany({
    data: [
      { name: "admin", description: "Admin of the system" },
      { name: "user", description: "User of the system" },
    ],
  });
}

main()
  .catch((_e) => {
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
