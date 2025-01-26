/*
  Warnings:

  - You are about to drop the column `stripe_product_id` on the `courses` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripe_account_id]` on the table `accounts_payment_details` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripe_course_id]` on the table `courses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stripe_account_id` to the `accounts_payment_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accounts_payment_details" ADD COLUMN     "stripe_account_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "stripe_product_id",
ADD COLUMN     "stripe_course_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "accounts_payment_details_stripe_account_id_key" ON "accounts_payment_details"("stripe_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "courses_stripe_course_id_key" ON "courses"("stripe_course_id");
