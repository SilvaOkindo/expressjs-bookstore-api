/*
  Warnings:

  - Added the required column `reviewed_at` to the `AuthorApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AuthorApplication" ADD COLUMN     "reviewed_at" TIMESTAMP(3) NOT NULL;
