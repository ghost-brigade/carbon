-- DropForeignKey
ALTER TABLE "Mission" DROP CONSTRAINT "Mission_userId_fkey";

-- AlterTable
ALTER TABLE "Mission" ALTER COLUMN "dateEnd" DROP NOT NULL,
ALTER COLUMN "rating" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "averageDailyRate" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Mission" ADD CONSTRAINT "Mission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
