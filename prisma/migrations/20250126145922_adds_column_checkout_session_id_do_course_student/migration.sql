/*
  Warnings:

  - A unique constraint covering the columns `[checkout_session_id]` on the table `courses_students` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "courses_students" ADD COLUMN     "checkout_session_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "courses_students_checkout_session_id_key" ON "courses_students"("checkout_session_id");
