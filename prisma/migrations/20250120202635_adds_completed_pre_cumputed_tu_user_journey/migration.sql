-- AlterTable
ALTER TABLE "chapter_user_journey_statuses" ADD COLUMN     "lessons_completed_count" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "unit_user_journey_statuses" ADD COLUMN     "chapters_completed_count" INTEGER NOT NULL DEFAULT 0;
