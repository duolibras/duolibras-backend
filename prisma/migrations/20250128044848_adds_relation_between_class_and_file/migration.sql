/*
  Warnings:

  - A unique constraint covering the columns `[banner_key]` on the table `classes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[video_key]` on the table `classes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "classes_banner_key_key" ON "classes"("banner_key");

-- CreateIndex
CREATE UNIQUE INDEX "classes_video_key_key" ON "classes"("video_key");

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_banner_key_fkey" FOREIGN KEY ("banner_key") REFERENCES "files"("fileKey") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_video_key_fkey" FOREIGN KEY ("video_key") REFERENCES "files"("fileKey") ON DELETE SET NULL ON UPDATE CASCADE;
