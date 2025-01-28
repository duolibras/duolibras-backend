/*
  Warnings:

  - A unique constraint covering the columns `[bannerKey]` on the table `courses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[videoKey]` on the table `courses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "FileStatus" AS ENUM ('PENDING', 'UPLOADED');

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "bannerKey" TEXT,
ADD COLUMN     "videoKey" TEXT;

-- CreateTable
CREATE TABLE "files" (
    "fileKey" TEXT NOT NULL,
    "status" "FileStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "files_pkey" PRIMARY KEY ("fileKey")
);

-- CreateIndex
CREATE UNIQUE INDEX "files_fileKey_key" ON "files"("fileKey");

-- CreateIndex
CREATE UNIQUE INDEX "courses_bannerKey_key" ON "courses"("bannerKey");

-- CreateIndex
CREATE UNIQUE INDEX "courses_videoKey_key" ON "courses"("videoKey");

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_bannerKey_fkey" FOREIGN KEY ("bannerKey") REFERENCES "files"("fileKey") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_videoKey_fkey" FOREIGN KEY ("videoKey") REFERENCES "files"("fileKey") ON DELETE SET NULL ON UPDATE CASCADE;
