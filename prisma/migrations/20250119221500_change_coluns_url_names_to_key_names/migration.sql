/*
  Warnings:

  - You are about to drop the column `video_url` on the `answers` table. All the data in the column will be lost.
  - You are about to drop the column `video_url` on the `contents` table. All the data in the column will be lost.
  - You are about to drop the column `metadata_url` on the `machine_learning_models` table. All the data in the column will be lost.
  - You are about to drop the column `model_url` on the `machine_learning_models` table. All the data in the column will be lost.
  - You are about to drop the column `weights_url` on the `machine_learning_models` table. All the data in the column will be lost.
  - You are about to drop the column `video_url` on the `questions` table. All the data in the column will be lost.
  - Added the required column `video_key` to the `contents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metadata_key` to the `machine_learning_models` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model_key` to the `machine_learning_models` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weights_key` to the `machine_learning_models` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "answers" DROP COLUMN "video_url",
ADD COLUMN     "video_key" TEXT;

-- AlterTable
ALTER TABLE "contents" DROP COLUMN "video_url",
ADD COLUMN     "video_key" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "machine_learning_models" DROP COLUMN "metadata_url",
DROP COLUMN "model_url",
DROP COLUMN "weights_url",
ADD COLUMN     "metadata_key" TEXT NOT NULL,
ADD COLUMN     "model_key" TEXT NOT NULL,
ADD COLUMN     "weights_key" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "questions" DROP COLUMN "video_url",
ADD COLUMN     "video_key" TEXT;
