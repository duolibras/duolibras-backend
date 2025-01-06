/*
  Warnings:

  - Changed the type of `type` on the `modules` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ModuleType" AS ENUM ('CONTENT', 'QUESTION');

-- AlterTable
ALTER TABLE "modules" DROP COLUMN "type",
ADD COLUMN     "type" "ModuleType" NOT NULL;

-- DropEnum
DROP TYPE "ModelType";
