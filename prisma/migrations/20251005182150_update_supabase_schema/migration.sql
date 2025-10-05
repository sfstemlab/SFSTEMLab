/*
  Warnings:

  - You are about to drop the column `day` on the `Timeslot` table. All the data in the column will be lost.
  - You are about to drop the column `dayOfWeek` on the `Timeslot` table. All the data in the column will be lost.
  - You are about to drop the column `month` on the `Timeslot` table. All the data in the column will be lost.
  - Added the required column `date` to the `Timeslot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Timeslot" DROP COLUMN "day",
DROP COLUMN "dayOfWeek",
DROP COLUMN "month",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
