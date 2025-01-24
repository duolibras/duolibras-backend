/*
  Warnings:

  - The `status` column on the `chapter_user_journey_statuses` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `lesson_user_journey_statuses` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `unit_user_journey_statuses` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `type` on the `modules` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `questions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "module_type" AS ENUM ('CONTENT', 'QUESTION');

-- CreateEnum
CREATE TYPE "question_type" AS ENUM ('VIDEO', 'SINGLE_CHOICE');

-- CreateEnum
CREATE TYPE "user_journey_status" AS ENUM ('ACCOMPLISHED', 'AVAILABLE', 'UNAVAILABLE');

-- AlterTable
ALTER TABLE "chapter_user_journey_statuses" DROP COLUMN "status",
ADD COLUMN     "status" "user_journey_status" NOT NULL DEFAULT 'UNAVAILABLE';

-- AlterTable
ALTER TABLE "lesson_user_journey_statuses" DROP COLUMN "status",
ADD COLUMN     "status" "user_journey_status" NOT NULL DEFAULT 'UNAVAILABLE';

-- AlterTable
ALTER TABLE "modules" DROP COLUMN "type",
ADD COLUMN     "type" "module_type" NOT NULL;

-- AlterTable
ALTER TABLE "questions" DROP COLUMN "type",
ADD COLUMN     "type" "question_type" NOT NULL;

-- AlterTable
ALTER TABLE "unit_user_journey_statuses" DROP COLUMN "status",
ADD COLUMN     "status" "user_journey_status" NOT NULL DEFAULT 'UNAVAILABLE';

-- DropEnum
DROP TYPE "ModuleType";

-- DropEnum
DROP TYPE "QuestionType";

-- DropEnum
DROP TYPE "UserJourneyStatus";
