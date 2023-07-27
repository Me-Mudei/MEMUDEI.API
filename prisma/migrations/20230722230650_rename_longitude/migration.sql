/*
  Warnings:

  - You are about to drop the column `lon` on the `location` table. All the data in the column will be lost.
  - Added the required column `lng` to the `location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "location" DROP COLUMN "lon",
ADD COLUMN     "lng" DOUBLE PRECISION NOT NULL;
