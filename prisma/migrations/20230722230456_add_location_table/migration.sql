/*
  Warnings:

  - A unique constraint covering the columns `[location_id]` on the table `address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `location_id` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "address" ADD COLUMN     "location_id" CHAR(21) NOT NULL,
ALTER COLUMN "district" DROP NOT NULL;

-- CreateTable
CREATE TABLE "location" (
    "id" CHAR(21) NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lon" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "address_location_id_key" ON "address"("location_id");

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
