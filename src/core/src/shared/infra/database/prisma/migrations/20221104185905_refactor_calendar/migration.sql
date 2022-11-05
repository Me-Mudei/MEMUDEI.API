/*
  Warnings:

  - You are about to drop the `hour` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "hour" DROP CONSTRAINT "hour_weekday_id_fkey";

-- AlterTable
ALTER TABLE "weekday" ADD COLUMN     "available_hours" INTEGER[];

-- DropTable
DROP TABLE "hour";
