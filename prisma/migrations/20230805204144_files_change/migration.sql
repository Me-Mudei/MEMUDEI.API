/*
  Warnings:

  - You are about to drop the column `description` on the `file` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "file" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "properties_files" ADD COLUMN     "description" TEXT,
ADD COLUMN     "position" INTEGER;
