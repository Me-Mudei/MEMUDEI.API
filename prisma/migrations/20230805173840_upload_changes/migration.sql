/*
  Warnings:

  - You are about to drop the column `description` on the `file` table. All the data in the column will be lost.
  - Added the required column `position` to the `properties_files` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "file" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "properties_files" ADD COLUMN     "description" TEXT,
ADD COLUMN     "position" INTEGER NOT NULL;
