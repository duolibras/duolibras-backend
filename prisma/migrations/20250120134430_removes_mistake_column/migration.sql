/*
  Warnings:

  - You are about to drop the column `userJourneyId` on the `accounts` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "accounts_userJourneyId_key";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "userJourneyId";
