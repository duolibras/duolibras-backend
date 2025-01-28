/*
  Warnings:

  - A unique constraint covering the columns `[teacher_id]` on the table `classes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `teacher_id` to the `classes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "classes" ADD COLUMN     "teacher_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "classes_teacher_id_key" ON "classes"("teacher_id");

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
