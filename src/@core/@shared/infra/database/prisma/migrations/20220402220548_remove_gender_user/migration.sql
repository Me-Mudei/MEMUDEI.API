/*
  Warnings:

  - You are about to drop the column `gender` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `permissionId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_permissionId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "gender",
DROP COLUMN "permissionId";

-- DropTable
DROP TABLE "File";
