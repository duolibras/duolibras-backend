/*
  Warnings:

  - You are about to drop the `users_journey` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "chapter_user_journey_statuses" DROP CONSTRAINT "chapter_user_journey_statuses_account_id_fkey";

-- DropForeignKey
ALTER TABLE "lesson_user_journey_statuses" DROP CONSTRAINT "lesson_user_journey_statuses_account_id_fkey";

-- DropForeignKey
ALTER TABLE "unit_user_journey_statuses" DROP CONSTRAINT "unit_user_journey_statuses_account_id_fkey";

-- DropForeignKey
ALTER TABLE "users_journey" DROP CONSTRAINT "users_journey_account_id_fkey";

-- DropTable
DROP TABLE "users_journey";

-- AddForeignKey
ALTER TABLE "chapter_user_journey_statuses" ADD CONSTRAINT "chapter_user_journey_statuses_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_user_journey_statuses" ADD CONSTRAINT "lesson_user_journey_statuses_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unit_user_journey_statuses" ADD CONSTRAINT "unit_user_journey_statuses_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
