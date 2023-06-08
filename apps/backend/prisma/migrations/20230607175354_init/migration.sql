-- DropForeignKey
ALTER TABLE "Mission" DROP CONSTRAINT "Mission_societyId_fkey";

-- AlterTable
ALTER TABLE "Mission" ALTER COLUMN "societyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Mission" ADD CONSTRAINT "Mission_societyId_fkey" FOREIGN KEY ("societyId") REFERENCES "Society"("id") ON DELETE SET NULL ON UPDATE CASCADE;
