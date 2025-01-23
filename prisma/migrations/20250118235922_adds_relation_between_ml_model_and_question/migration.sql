/*
  Warnings:

  - The primary key for the `lesson_machine_learning_model` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `lessonId` on the `lesson_machine_learning_model` table. All the data in the column will be lost.
  - Added the required column `lesson_id` to the `lesson_machine_learning_model` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "lesson_machine_learning_model" DROP CONSTRAINT "lesson_machine_learning_model_lessonId_fkey";

-- AlterTable
ALTER TABLE "lesson_machine_learning_model" DROP CONSTRAINT "lesson_machine_learning_model_pkey",
DROP COLUMN "lessonId",
ADD COLUMN     "lesson_id" TEXT NOT NULL,
ADD CONSTRAINT "lesson_machine_learning_model_pkey" PRIMARY KEY ("lesson_id", "machine_learning_model_id");

-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "machine_learning_model_id" TEXT;

-- AddForeignKey
ALTER TABLE "lesson_machine_learning_model" ADD CONSTRAINT "lesson_machine_learning_model_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_machine_learning_model_id_fkey" FOREIGN KEY ("machine_learning_model_id") REFERENCES "machine_learning_models"("id") ON DELETE SET NULL ON UPDATE CASCADE;
