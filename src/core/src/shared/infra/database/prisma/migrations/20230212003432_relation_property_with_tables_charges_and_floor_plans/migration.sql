/*
  Warnings:

  - You are about to drop the column `amount` on the `charge` table. All the data in the column will be lost.
  - You are about to drop the column `property_id` on the `charge` table. All the data in the column will be lost.
  - You are about to drop the column `property_id` on the `floor_plan` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `floor_plan` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "charge" DROP CONSTRAINT "charge_property_id_fkey";

-- DropForeignKey
ALTER TABLE "floor_plan" DROP CONSTRAINT "floor_plan_property_id_fkey";

-- AlterTable
ALTER TABLE "charge" DROP COLUMN "amount",
DROP COLUMN "property_id",
ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "floor_plan" DROP COLUMN "property_id",
DROP COLUMN "quantity";

-- CreateTable
CREATE TABLE "properties_floor_plans" (
    "floor_plan_id" CHAR(21) NOT NULL,
    "property_id" CHAR(21) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "properties_floor_plans_pkey" PRIMARY KEY ("property_id","floor_plan_id")
);

-- CreateTable
CREATE TABLE "properties_charges" (
    "property_id" CHAR(21) NOT NULL,
    "charge_id" CHAR(21) NOT NULL,
    "amount" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "properties_charges_pkey" PRIMARY KEY ("property_id","charge_id")
);

-- AddForeignKey
ALTER TABLE "properties_floor_plans" ADD CONSTRAINT "properties_floor_plans_floor_plan_id_fkey" FOREIGN KEY ("floor_plan_id") REFERENCES "floor_plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties_floor_plans" ADD CONSTRAINT "properties_floor_plans_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties_charges" ADD CONSTRAINT "properties_charges_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "properties_charges" ADD CONSTRAINT "properties_charges_charge_id_fkey" FOREIGN KEY ("charge_id") REFERENCES "charge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
