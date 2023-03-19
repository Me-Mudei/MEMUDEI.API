/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `charge` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[key]` on the table `condominium_detail` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[key]` on the table `floor_plan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[key]` on the table `privacy_type` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[key]` on the table `property_detail` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[key]` on the table `property_relationship` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[key]` on the table `property_type` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[key]` on the table `rule` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `charge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `condominium_detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `floor_plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `privacy_type` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `property_detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `property_relationship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `property_type` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `rule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "charge" ADD COLUMN     "key" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "condominium_detail" ADD COLUMN     "key" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "floor_plan" ADD COLUMN     "key" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "privacy_type" ADD COLUMN     "key" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "property_detail" ADD COLUMN     "key" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "property_relationship" ADD COLUMN     "key" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "property_type" ADD COLUMN     "key" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "rule" ADD COLUMN     "key" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "charge_key_key" ON "charge"("key");

-- CreateIndex
CREATE UNIQUE INDEX "condominium_detail_key_key" ON "condominium_detail"("key");

-- CreateIndex
CREATE UNIQUE INDEX "floor_plan_key_key" ON "floor_plan"("key");

-- CreateIndex
CREATE UNIQUE INDEX "privacy_type_key_key" ON "privacy_type"("key");

-- CreateIndex
CREATE UNIQUE INDEX "property_detail_key_key" ON "property_detail"("key");

-- CreateIndex
CREATE UNIQUE INDEX "property_relationship_key_key" ON "property_relationship"("key");

-- CreateIndex
CREATE UNIQUE INDEX "property_type_key_key" ON "property_type"("key");

-- CreateIndex
CREATE UNIQUE INDEX "rule_key_key" ON "rule"("key");
