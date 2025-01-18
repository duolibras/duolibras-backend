-- DropForeignKey
ALTER TABLE "contents" DROP CONSTRAINT "contents_lesson_id_fkey";

-- DropForeignKey
ALTER TABLE "lesson_machine_learning_model" DROP CONSTRAINT "lesson_machine_learning_model_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "lesson_machine_learning_model" DROP CONSTRAINT "lesson_machine_learning_model_machine_learning_model_id_fkey";

-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_lesson_id_fkey";

-- AddForeignKey
ALTER TABLE "lesson_machine_learning_model" ADD CONSTRAINT "lesson_machine_learning_model_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_machine_learning_model" ADD CONSTRAINT "lesson_machine_learning_model_machine_learning_model_id_fkey" FOREIGN KEY ("machine_learning_model_id") REFERENCES "machine_learning_models"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_lesson_id_fkey" FOREIGN KEY ("lesson_id") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;
