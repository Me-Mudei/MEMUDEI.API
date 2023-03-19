/*
  Warnings:

  - You are about to drop the column `quantity` on the `properties_floor_plans` table. All the data in the column will be lost.
  - Added the required column `value` to the `properties_floor_plans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "properties_floor_plans" DROP COLUMN "quantity",
ADD COLUMN     "value" INTEGER NOT NULL;
