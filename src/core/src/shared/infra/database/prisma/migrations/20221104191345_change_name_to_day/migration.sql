/*
  Warnings:

  - You are about to drop the column `name` on the `weekday` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[day]` on the table `weekday` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `day` to the `weekday` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "weekday_name_key";

-- AlterTable
ALTER TABLE "weekday" DROP COLUMN "name",
ADD COLUMN     "day" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "weekday_day_key" ON "weekday"("day");
