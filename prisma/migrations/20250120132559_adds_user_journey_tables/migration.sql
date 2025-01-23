/*
  Warnings:

  - A unique constraint covering the columns `[userJourneyId]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userJourneyId` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserJourneyStatus" AS ENUM ('ACCOMPLISHED', 'AVAILABLE', 'UNAVAILABLE');

-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "userJourneyId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ChapterUserJourneyStatus" (
    "account_id" TEXT NOT NULL,
    "chapter_id" TEXT NOT NULL,
    "status" "UserJourneyStatus" NOT NULL DEFAULT 'UNAVAILABLE',

    CONSTRAINT "ChapterUserJourneyStatus_pkey" PRIMARY KEY ("account_id","chapter_id")
);

-- CreateTable
CREATE TABLE "LessonUserJourneyStatus" (
    "account_id" TEXT NOT NULL,
    "lesson_id" TEXT NOT NULL,
    "status" "UserJourneyStatus" NOT NULL DEFAULT 'UNAVAILABLE',

    CONSTRAINT "LessonUserJourneyStatus_pkey" PRIMARY KEY ("account_id","lesson_id")
);

-- CreateTable
CREATE TABLE "UnitUserJourneyStatus" (
    "account_id" TEXT NOT NULL,
    "unit_id" TEXT NOT NULL,
    "status" "UserJourneyStatus" NOT NULL DEFAULT 'UNAVAILABLE',

    CONSTRAINT "UnitUserJourneyStatus_pkey" PRIMARY KEY ("account_id","unit_id")
);

-- CreateTable
CREATE TABLE "UserJourney" (
    "account_id" TEXT NOT NULL,

    CONSTRAINT "UserJourney_pkey" PRIMARY KEY ("account_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserJourney_account_id_key" ON "UserJourney"("account_id");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_userJourneyId_key" ON "accounts"("userJourneyId");

-- AddForeignKey
ALTER TABLE "ChapterUserJourneyStatus" ADD CONSTRAINT "ChapterUserJourneyStatus_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChapterUserJourneyStatus" ADD CONSTRAINT "ChapterUserJourneyStatus_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "UserJourney"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonUserJourneyStatus" ADD CONSTRAINT "LessonUserJourneyStatus_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonUserJourneyStatus" ADD CONSTRAINT "LessonUserJourneyStatus_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "UserJourney"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitUserJourneyStatus" ADD CONSTRAINT "UnitUserJourneyStatus_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitUserJourneyStatus" ADD CONSTRAINT "UnitUserJourneyStatus_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "UserJourney"("account_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserJourney" ADD CONSTRAINT "UserJourney_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
