-- AlterTable
ALTER TABLE "Location" ALTER COLUMN "latitude" SET DATA TYPE TEXT,
ALTER COLUMN "longitude" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "description" TEXT;
