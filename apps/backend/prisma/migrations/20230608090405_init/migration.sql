/*
  Warnings:

  - Made the column `userId` on table `Mission` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Mission" DROP CONSTRAINT "Mission_userId_fkey";

-- AlterTable
ALTER TABLE "Mission" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserAchievement" ADD COLUMN     "description" TEXT;

-- AddForeignKey
ALTER TABLE "Mission" ADD CONSTRAINT "Mission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
