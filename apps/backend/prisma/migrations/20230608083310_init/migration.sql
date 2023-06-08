/*
  Warnings:

  - You are about to drop the column `achievementId` on the `UserAchievement` table. All the data in the column will be lost.
  - You are about to drop the `Achievement` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `achievement` to the `UserAchievement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserAchievement" DROP CONSTRAINT "UserAchievement_achievementId_fkey";

-- AlterTable
ALTER TABLE "UserAchievement" DROP COLUMN "achievementId",
ADD COLUMN     "achievement" TEXT NOT NULL;

-- DropTable
DROP TABLE "Achievement";
