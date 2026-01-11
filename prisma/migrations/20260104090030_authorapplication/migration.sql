-- CreateEnum
CREATE TYPE "AUTHOR_STATUS" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "AuthorApplication" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" "AUTHOR_STATUS" NOT NULL DEFAULT 'PENDING',
    "reason" TEXT NOT NULL,
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewedAt" TIMESTAMP(3),

    CONSTRAINT "AuthorApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthorApplication_userId_key" ON "AuthorApplication"("userId");

-- AddForeignKey
ALTER TABLE "AuthorApplication" ADD CONSTRAINT "AuthorApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
