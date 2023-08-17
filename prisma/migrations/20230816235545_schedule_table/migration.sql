/*
  Warnings:

  - You are about to drop the `calendar` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `weekday` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "calendar" DROP CONSTRAINT "calendar_user_id_fkey";

-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_calendar_id_fkey";

-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_property_id_fkey";

-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_scheduler_id_fkey";

-- DropForeignKey
ALTER TABLE "weekday" DROP CONSTRAINT "weekday_calendar_id_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "phone" TEXT,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'deal',
ALTER COLUMN "external_id" DROP NOT NULL;

-- DropTable
DROP TABLE "calendar";

-- DropTable
DROP TABLE "event";

-- DropTable
DROP TABLE "weekday";

-- CreateTable
CREATE TABLE "schedule" (
    "id" CHAR(21) NOT NULL,
    "date_time" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "property_id" CHAR(21) NOT NULL,
    "visitor_id" CHAR(21) NOT NULL,

    CONSTRAINT "schedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_visitor_id_fkey" FOREIGN KEY ("visitor_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
