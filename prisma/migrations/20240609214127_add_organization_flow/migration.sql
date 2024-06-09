/*
  Warnings:

  - You are about to drop the `address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `charge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `condominium_detail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `file` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `floor_plan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `privacy_type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `properties_charges` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `properties_condominium_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `properties_files` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `properties_floor_plans` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `properties_property_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `properties_rules` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `property` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `property_detail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `property_relationship` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `property_type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `schedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_location_id_fkey";

-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_property_id_fkey";

-- DropForeignKey
ALTER TABLE "properties_charges" DROP CONSTRAINT "properties_charges_charge_key_fkey";

-- DropForeignKey
ALTER TABLE "properties_charges" DROP CONSTRAINT "properties_charges_property_id_fkey";

-- DropForeignKey
ALTER TABLE "properties_condominium_details" DROP CONSTRAINT "properties_condominium_details_condominium_detail_key_fkey";

-- DropForeignKey
ALTER TABLE "properties_condominium_details" DROP CONSTRAINT "properties_condominium_details_property_id_fkey";

-- DropForeignKey
ALTER TABLE "properties_files" DROP CONSTRAINT "properties_files_file_id_fkey";

-- DropForeignKey
ALTER TABLE "properties_files" DROP CONSTRAINT "properties_files_property_id_fkey";

-- DropForeignKey
ALTER TABLE "properties_floor_plans" DROP CONSTRAINT "properties_floor_plans_floor_plan_key_fkey";

-- DropForeignKey
ALTER TABLE "properties_floor_plans" DROP CONSTRAINT "properties_floor_plans_property_id_fkey";

-- DropForeignKey
ALTER TABLE "properties_property_details" DROP CONSTRAINT "properties_property_details_property_detail_key_fkey";

-- DropForeignKey
ALTER TABLE "properties_property_details" DROP CONSTRAINT "properties_property_details_property_id_fkey";

-- DropForeignKey
ALTER TABLE "properties_rules" DROP CONSTRAINT "properties_rules_property_id_fkey";

-- DropForeignKey
ALTER TABLE "properties_rules" DROP CONSTRAINT "properties_rules_rule_key_fkey";

-- DropForeignKey
ALTER TABLE "property" DROP CONSTRAINT "property_privacy_type_id_fkey";

-- DropForeignKey
ALTER TABLE "property" DROP CONSTRAINT "property_property_relationship_id_fkey";

-- DropForeignKey
ALTER TABLE "property" DROP CONSTRAINT "property_property_type_id_fkey";

-- DropForeignKey
ALTER TABLE "property" DROP CONSTRAINT "property_user_id_fkey";

-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_property_id_fkey";

-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_visitor_id_fkey";

-- DropTable
DROP TABLE "address";

-- DropTable
DROP TABLE "charge";

-- DropTable
DROP TABLE "condominium_detail";

-- DropTable
DROP TABLE "file";

-- DropTable
DROP TABLE "floor_plan";

-- DropTable
DROP TABLE "location";

-- DropTable
DROP TABLE "privacy_type";

-- DropTable
DROP TABLE "properties_charges";

-- DropTable
DROP TABLE "properties_condominium_details";

-- DropTable
DROP TABLE "properties_files";

-- DropTable
DROP TABLE "properties_floor_plans";

-- DropTable
DROP TABLE "properties_property_details";

-- DropTable
DROP TABLE "properties_rules";

-- DropTable
DROP TABLE "property";

-- DropTable
DROP TABLE "property_detail";

-- DropTable
DROP TABLE "property_relationship";

-- DropTable
DROP TABLE "property_type";

-- DropTable
DROP TABLE "rule";

-- DropTable
DROP TABLE "schedule";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "OrgRole" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrgRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GlobalRole" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GlobalRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "merchant_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "org_role_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Merchant" (
    "id" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "organization_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Merchant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invitation" (
    "token" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "merchant_id" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("email","merchant_id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "external_id" TEXT,
    "password" TEXT,
    "person_id" TEXT,
    "global_role_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT,
    "birth_date" TIMESTAMP(3),
    "address_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "district" TEXT,
    "complement" TEXT,
    "location_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "gov_id_type" TEXT NOT NULL,
    "gov_id_number" TEXT NOT NULL,
    "gov_country" TEXT NOT NULL,
    "person_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "merchant_id" TEXT NOT NULL,
    "person_id" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("merchant_id","person_id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "property_type" TEXT NOT NULL,
    "address_id" TEXT NOT NULL,
    "merchant_id" TEXT NOT NULL,
    "created_by_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Detail" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL,
    "value" DOUBLE PRECISION,
    "unit" TEXT,
    "property_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "external_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "subtype" TEXT NOT NULL,
    "position" INTEGER,
    "description" TEXT,
    "property_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrgRole_name_key" ON "OrgRole"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GlobalRole_name_key" ON "GlobalRole"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Member_merchant_id_user_id_key" ON "Member"("merchant_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_organization_id_key" ON "Merchant"("organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_token_key" ON "Invitation"("token");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_external_id_key" ON "User"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_person_id_key" ON "User"("person_id");

-- CreateIndex
CREATE UNIQUE INDEX "Person_address_id_key" ON "Person"("address_id");

-- CreateIndex
CREATE UNIQUE INDEX "Address_location_id_key" ON "Address"("location_id");

-- CreateIndex
CREATE UNIQUE INDEX "Property_address_id_key" ON "Property"("address_id");

-- CreateIndex
CREATE UNIQUE INDEX "Detail_property_id_key_key" ON "Detail"("property_id", "key");

-- CreateIndex
CREATE UNIQUE INDEX "File_external_id_key" ON "File"("external_id");

-- CreateIndex
CREATE UNIQUE INDEX "File_property_id_key" ON "File"("property_id");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_merchant_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_org_role_id_fkey" FOREIGN KEY ("org_role_id") REFERENCES "OrgRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Merchant" ADD CONSTRAINT "Merchant_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_merchant_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_global_role_id_fkey" FOREIGN KEY ("global_role_id") REFERENCES "GlobalRole"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "Person"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_merchant_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_merchant_id_fkey" FOREIGN KEY ("merchant_id") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detail" ADD CONSTRAINT "Detail_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;
