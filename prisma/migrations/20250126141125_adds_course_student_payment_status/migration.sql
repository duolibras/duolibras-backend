/*
  Warnings:

  - Added the required column `paymentStatus` to the `courses_students` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CourseStudentPaymentStatus" AS ENUM ('EXPIRED', 'PENDING', 'APPROVED');

-- AlterTable
ALTER TABLE "courses_students" ADD COLUMN     "paymentStatus" "CourseStudentPaymentStatus" NOT NULL;
