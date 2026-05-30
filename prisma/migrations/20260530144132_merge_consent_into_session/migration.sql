-- AlterTable: add consent fields to ChatSession
ALTER TABLE "ChatSession" ADD COLUMN "policyVersion" TEXT;
ALTER TABLE "ChatSession" ADD COLUMN "consentGivenAt" DATETIME;

-- DropTable
DROP TABLE IF EXISTS "ConsentLog";
