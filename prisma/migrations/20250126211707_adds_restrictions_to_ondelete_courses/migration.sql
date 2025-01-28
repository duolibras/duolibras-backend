-- DropForeignKey
ALTER TABLE "classes" DROP CONSTRAINT "classes_course_id_fkey";

-- DropForeignKey
ALTER TABLE "courses_students" DROP CONSTRAINT "courses_students_student_id_fkey";

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes_students" ADD CONSTRAINT "classes_students_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes_students" ADD CONSTRAINT "classes_students_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses_students" ADD CONSTRAINT "courses_students_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
