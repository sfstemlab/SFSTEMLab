/*
  Warnings:

  - You are about to drop the column `duration` on the `Timeslot` table. All the data in the column will be lost.
  - You are about to drop the column `durationUnit` on the `Timeslot` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `Timeslot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Timeslot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Timeslot" DROP COLUMN "duration",
DROP COLUMN "durationUnit",
ADD COLUMN     "endTime" INTEGER NOT NULL,
ADD COLUMN     "startTime" INTEGER NOT NULL;
