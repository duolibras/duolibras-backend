/*
  Warnings:

  - You are about to drop the column `bankAccountNumber` on the `accounts_payment_details` table. All the data in the column will be lost.
  - You are about to drop the column `bankRoutingNumber` on the `accounts_payment_details` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `accounts_payment_details` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "account_payment_details_status" AS ENUM ('EXPIRED', 'PENDING', 'COMPLETED');

-- AlterTable
ALTER TABLE "accounts_payment_details" DROP COLUMN "bankAccountNumber",
DROP COLUMN "bankRoutingNumber",
DROP COLUMN "cpf",
ADD COLUMN     "status" "account_payment_details_status" NOT NULL DEFAULT 'PENDING';
