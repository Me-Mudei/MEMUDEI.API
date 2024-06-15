/*
  Warnings:

  - You are about to drop the column `created_at` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `gov_country` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `gov_id_number` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `gov_id_type` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `person_id` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `property_id` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `expires_at` on the `Invitation` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `Invitation` table. All the data in the column will be lost.
  - You are about to drop the column `person_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[person_id]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `property_id` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by_id` to the `Invitation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `org_role_id` to the `Invitation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token_id` to the `Invitation` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Member` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_merchant_id_fkey";

-- DropForeignKey
ALTER TABLE "Customer" DROP CONSTRAINT "Customer_person_id_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_person_id_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_property_id_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_created_by_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_person_id_fkey";

-- DropIndex
DROP INDEX "File_property_id_key";

-- DropIndex
DROP INDEX "Invitation_token_key";

-- DropIndex
DROP INDEX "Merchant_organization_id_key";

-- DropIndex
DROP INDEX "User_person_id_key";

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "created_at",
DROP COLUMN "gov_country",
DROP COLUMN "gov_id_number",
DROP COLUMN "gov_id_type",
DROP COLUMN "person_id",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "file_id" TEXT,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "property_id" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "template_id" TEXT,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "File" DROP COLUMN "description",
DROP COLUMN "position",
DROP COLUMN "property_id";

-- AlterTable
ALTER TABLE "Invitation" DROP COLUMN "expires_at",
DROP COLUMN "token",
ADD COLUMN     "created_by_id" TEXT NOT NULL,
ADD COLUMN     "org_role_id" TEXT NOT NULL,
ADD COLUMN     "token_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "person_id" TEXT,
ALTER COLUMN "user_id" DROP NOT NULL,
ADD CONSTRAINT "Member_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Person" ALTER COLUMN "first_name" DROP NOT NULL,
ALTER COLUMN "last_name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "person_id";

-- DropTable
DROP TABLE "Customer";

-- CreateTable
CREATE TABLE "GovDocument" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "person_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GovDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "merchant_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("merchant_id","person_id")
);

-- CreateTable
CREATE TABLE "PropertyMedia" (
    "position" INTEGER NOT NULL,
    "description" TEXT,
    "file_id" TEXT NOT NULL,
    "property_id" TEXT NOT NULL,

    CONSTRAINT "PropertyMedia_pkey" PRIMARY KEY ("file_id","property_id")
);

-- CreateTable
CREATE TABLE "Signatory" (
    "external_id" TEXT,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,
    "document_id" TEXT NOT NULL,
    "token_id" TEXT,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Signatory_pkey" PRIMARY KEY ("person_id","document_id")
);

-- CreateTable
CREATE TABLE "Template" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "merchant_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FieldGroup" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL,
    "template_id" TEXT NOT NULL,

    CONSTRAINT "FieldGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Field" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL,
    "field_group_id" TEXT NOT NULL,

    CONSTRAINT "Field_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "token" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("token")
);

-- CreateIndex
CREATE UNIQUE INDEX "Signatory_external_id_key" ON "Signatory"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "Member_person_id_key" ON "Member"("person_id");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_org_role_id_fkey" FOREIGN KEY ("org_role_id") REFERENCES "OrgRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_token_id_fkey" FOREIGN KEY ("token_id") REFERENCES "Token"("token") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GovDocument" ADD CONSTRAINT "GovDocument_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_merchant_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyMedia" ADD CONSTRAINT "PropertyMedia_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyMedia" ADD CONSTRAINT "PropertyMedia_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Signatory" ADD CONSTRAINT "Signatory_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Signatory" ADD CONSTRAINT "Signatory_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Signatory" ADD CONSTRAINT "Signatory_token_id_fkey" FOREIGN KEY ("token_id") REFERENCES "Token"("token") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "Template"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_merchant_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldGroup" ADD CONSTRAINT "FieldGroup_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Field" ADD CONSTRAINT "Field_field_group_id_fkey" FOREIGN KEY ("field_group_id") REFERENCES "FieldGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
