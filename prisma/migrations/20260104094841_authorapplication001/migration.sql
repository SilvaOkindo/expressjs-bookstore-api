/*
  Warnings:

  - You are about to drop the column `reason` on the `AuthorApplication` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AuthorApplication" DROP COLUMN "reason",
ADD COLUMN     "motivation" TEXT;
