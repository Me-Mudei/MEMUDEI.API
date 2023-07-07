/*
  Warnings:

  - You are about to drop the column `file` on the `file` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `file` table. All the data in the column will be lost.
  - Added the required column `filename` to the `file` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "file" DROP COLUMN "file",
DROP COLUMN "name",
ADD COLUMN     "filename" TEXT NOT NULL;
