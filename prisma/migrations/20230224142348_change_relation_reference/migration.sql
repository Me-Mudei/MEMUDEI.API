/*
  Warnings:

  - The primary key for the `properties_charges` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `charge_id` on the `properties_charges` table. All the data in the column will be lost.
  - The primary key for the `properties_condominium_details` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `condominium_detail_id` on the `properties_condominium_details` table. All the data in the column will be lost.
  - The primary key for the `properties_floor_plans` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `floor_plan_id` on the `properties_floor_plans` table. All the data in the column will be lost.
  - The primary key for the `properties_property_details` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `property_detail_id` on the `properties_property_details` table. All the data in the column will be lost.
  - The primary key for the `properties_rules` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `rule_id` on the `properties_rules` table. All the data in the column will be lost.
  - Added the required column `charge_key` to the `properties_charges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `condominium_detail_key` to the `properties_condominium_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floor_plan_key` to the `properties_floor_plans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `property_detail_key` to the `properties_property_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rule_key` to the `properties_rules` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "properties_charges" DROP CONSTRAINT "properties_charges_charge_id_fkey";

-- DropForeignKey
ALTER TABLE "properties_condominium_details" DROP CONSTRAINT "properties_condominium_details_condominium_detail_id_fkey";

-- DropForeignKey
ALTER TABLE "properties_floor_plans" DROP CONSTRAINT "properties_floor_plans_floor_plan_id_fkey";

-- DropForeignKey
ALTER TABLE "properties_property_details" DROP CONSTRAINT "properties_property_details_property_detail_id_fkey";

-- DropForeignKey
ALTER TABLE "properties_rules" DROP CONSTRAINT "properties_rules_rule_id_fkey";

-- AlterTable
ALTER TABLE "properties_charges" DROP CONSTRAINT "properties_charges_pkey",
DROP COLUMN "charge_id",
ADD COLUMN     "charge_key" TEXT NOT NULL,
ADD CONSTRAINT "properties_charges_pkey" PRIMARY KEY ("property_id", "charge_key");

-- AlterTable
ALTER TABLE "properties_condominium_details" DROP CONSTRAINT "properties_condominium_details_pkey",
DROP COLUMN "condominium_detail_id",
ADD COLUMN     "condominium_detail_key" TEXT NOT NULL,
ADD CONSTRAINT "properties_condominium_details_pkey" PRIMARY KEY ("property_id", "condominium_detail_key");

-- AlterTable
ALTER TABLE "properties_floor_plans" DROP CONSTRAINT "properties_floor_plans_pkey",
DROP COLUMN "floor_plan_id",
ADD COLUMN     "floor_plan_key" TEXT NOT NULL,
ADD CONSTRAINT "properties_floor_plans_pkey" PRIMARY KEY ("property_id", "floor_plan_key");

-- AlterTable
ALTER TABLE "properties_property_details" DROP CONSTRAINT "properties_property_details_pkey",
DROP COLUMN "property_detail_id",
ADD COLUMN     "property_detail_key" TEXT NOT NULL,
ADD CONSTRAINT "properties_property_details_pkey" PRIMARY KEY ("property_id", "property_detail_key");

-- AlterTable
ALTER TABLE "properties_rules" DROP CONSTRAINT "properties_rules_pkey",
DROP COLUMN "rule_id",
ADD COLUMN     "rule_key" TEXT NOT NULL,
ADD CONSTRAINT "properties_rules_pkey" PRIMARY KEY ("property_id", "rule_key");

-- AddForeignKey
ALTER TABLE "properties_floor_plans" ADD CONSTRAINT "properties_floor_plans_floor_plan_key_fkey" FOREIGN KEY ("floor_plan_key") REFERENCES "floor_plan"("key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties_property_details" ADD CONSTRAINT "properties_property_details_property_detail_key_fkey" FOREIGN KEY ("property_detail_key") REFERENCES "property_detail"("key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties_condominium_details" ADD CONSTRAINT "properties_condominium_details_condominium_detail_key_fkey" FOREIGN KEY ("condominium_detail_key") REFERENCES "condominium_detail"("key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties_rules" ADD CONSTRAINT "properties_rules_rule_key_fkey" FOREIGN KEY ("rule_key") REFERENCES "rule"("key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties_charges" ADD CONSTRAINT "properties_charges_charge_key_fkey" FOREIGN KEY ("charge_key") REFERENCES "charge"("key") ON DELETE RESTRICT ON UPDATE CASCADE;
