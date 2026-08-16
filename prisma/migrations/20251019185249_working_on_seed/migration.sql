/*
  Warnings:

  - Added the required column `email` to the `eventSignup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `eventSignup` table without a default value. This is not possible if the table is not empty.
  - Made the column `firstName` on table `eventSignup` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastName` on table `eventSignup` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "eventSignup" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "firstName" SET NOT NULL,
ALTER COLUMN "lastName" SET NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "clerkId" TEXT,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "eventSignup" ADD CONSTRAINT "eventSignup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
