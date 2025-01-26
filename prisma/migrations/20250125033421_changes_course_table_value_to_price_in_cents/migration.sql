/*
  Warnings:

  - You are about to drop the column `value` on the `courses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "courses" DROP COLUMN "value",
ADD COLUMN     "price_in_cents" DOUBLE PRECISION;
