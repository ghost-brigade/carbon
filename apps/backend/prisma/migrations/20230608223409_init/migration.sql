-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('avatar', 'resource');

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "type" "FileType" NOT NULL DEFAULT 'resource';
