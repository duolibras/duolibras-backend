/*
  Warnings:

  - You are about to drop the column `wheights_url` on the `machine_learning_models` table. All the data in the column will be lost.
  - Added the required column `weights_url` to the `machine_learning_models` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "machine_learning_models" DROP COLUMN "wheights_url",
ADD COLUMN     "weights_url" TEXT NOT NULL;
