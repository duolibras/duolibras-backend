/*
  Warnings:

  - You are about to drop the `ChapterUserJourneyStatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LessonUserJourneyStatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UnitUserJourneyStatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserJourney` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChapterUserJourneyStatus" DROP CONSTRAINT "ChapterUserJourneyStatus_account_id_fkey";

-- DropForeignKey
ALTER TABLE "ChapterUserJourneyStatus" DROP CONSTRAINT "ChapterUserJourneyStatus_chapter_id_fkey";

-- DropForeignKey
ALTER TABLE "LessonUserJourneyStatus" DROP CONSTRAINT "LessonUserJourneyStatus_account_id_fkey";

-- DropForeignKey
ALTER TABLE "LessonUserJourneyStatus" DROP CONSTRAINT "LessonUserJourneyStatus_lesson_id_fkey";

-- DropForeignKey
ALTER TABLE "UnitUserJourneyStatus" DROP CONSTRAINT "UnitUserJourneyStatus_account_id_fkey";

-- DropForeignKey
ALTER TABLE "UnitUserJourneyStatus" DROP CONSTRAINT "UnitUserJourneyStatus_unit_id_fkey";

-- DropForeignKey
ALTER TABLE "UserJourney" DROP CONSTRAINT "UserJourney_account_id_fkey";

-- DropTable
DROP TABLE "ChapterUserJourneyStatus";

-- DropTable
DROP TABLE "LessonUserJourneyStatus";

-- DropTable
DROP TABLE "UnitUserJourneyStatus";

-- DropTable
DROP TABLE "UserJourney";

-- CreateTable
CREATE TABLE "chapter_user_journey_statuses" (
    "account_id" TEXT NOT NULL,
    "chapter_id" TEXT NOT NULL,
    "status" "UserJourneyStatus" NOT NULL DEFAULT 'UNAVAILABLE',

    CONSTRAINT "chapter_user_journey_statuses_pkey" PRIMARY KEY ("account_id","chapter_id")
);

-- CreateTable
CREATE TABLE "lesson_user_journey_statuses" (
    "account_id" TEXT NOT NULL,
    "lesson_id" TEXT NOT NULL,
    "status" "UserJourneyStatus" NOT NULL DEFAULT 'UNAVAILABLE',

    CONSTRAINT "lesson_user_journey_statuses_pkey" PRIMARY KEY ("account_id","lesson_id")
);

-- CreateTable
CREATE TABLE "unit_user_journey_statuses" (
    "account_id" TEXT NOT NULL,
    "unit_id" TEXT NOT NULL,
    "status" "UserJourneyStatus" NOT NULL DEFAULT 'UNAVAILABLE',

    CONSTRAINT "unit_user_journey_statuses_pkey" PRIMARY KEY ("account_id","unit_id")
);

-- CreateTable
CREATE TABLE "users_journey" (
    "account_id" TEXT NOT NULL,

    CONSTRAINT "users_journey_pkey" PRIMARY KEY ("account_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_journey_account_id_key" ON "users_journey"("account_id");

-- AddForeignKey
ALTER TABLE "chapter_user_journey_statuses" ADD CONSTRAINT "chapter_user_journey_statuses_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapter_user_journey_statuses" ADD CONSTRAINT "chapter_user_journey_statuses_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "users_journey"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_user_journey_statuses" ADD CONSTRAINT "lesson_user_journey_statuses_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_user_journey_statuses" ADD CONSTRAINT "lesson_user_journey_statuses_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "users_journey"("account_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unit_user_journey_statuses" ADD CONSTRAINT "unit_user_journey_statuses_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unit_user_journey_statuses" ADD CONSTRAINT "unit_user_journey_statuses_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "users_journey"("account_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_journey" ADD CONSTRAINT "users_journey_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
