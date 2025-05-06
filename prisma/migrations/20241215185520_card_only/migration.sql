/*
  Warnings:

  - You are about to drop the column `cardSetId` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `flavor_text` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `oracle_text` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `rarityId` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the `CardColor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CardSet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CardSubtype` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CardSupertype` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CardType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Color` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pack` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PackType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rarity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subtype` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Supertype` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserCard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CardSetToPackType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `booster` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `digital` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_uris` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `layout` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `legalities` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oracale_text` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prices` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchase_uris` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rarity` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `related_uris` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `released_at` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reprint` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rulings_uri` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `set` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `set_name` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `set_type` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `set_uri` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_line` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Made the column `power` on table `Card` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_cardSetId_fkey";

-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_rarityId_fkey";

-- DropForeignKey
ALTER TABLE "CardColor" DROP CONSTRAINT "CardColor_cardId_fkey";

-- DropForeignKey
ALTER TABLE "CardColor" DROP CONSTRAINT "CardColor_colorId_fkey";

-- DropForeignKey
ALTER TABLE "CardSubtype" DROP CONSTRAINT "CardSubtype_cardId_fkey";

-- DropForeignKey
ALTER TABLE "CardSubtype" DROP CONSTRAINT "CardSubtype_subtypeId_fkey";

-- DropForeignKey
ALTER TABLE "CardSupertype" DROP CONSTRAINT "CardSupertype_cardId_fkey";

-- DropForeignKey
ALTER TABLE "CardSupertype" DROP CONSTRAINT "CardSupertype_supertypeId_fkey";

-- DropForeignKey
ALTER TABLE "CardType" DROP CONSTRAINT "CardType_cardId_fkey";

-- DropForeignKey
ALTER TABLE "CardType" DROP CONSTRAINT "CardType_typeId_fkey";

-- DropForeignKey
ALTER TABLE "Pack" DROP CONSTRAINT "Pack_packTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Pack" DROP CONSTRAINT "Pack_setId_fkey";

-- DropForeignKey
ALTER TABLE "Pack" DROP CONSTRAINT "Pack_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserCard" DROP CONSTRAINT "UserCard_cardId_fkey";

-- DropForeignKey
ALTER TABLE "UserCard" DROP CONSTRAINT "UserCard_userId_fkey";

-- DropForeignKey
ALTER TABLE "_CardSetToPackType" DROP CONSTRAINT "_CardSetToPackType_A_fkey";

-- DropForeignKey
ALTER TABLE "_CardSetToPackType" DROP CONSTRAINT "_CardSetToPackType_B_fkey";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "cardSetId",
DROP COLUMN "flavor_text",
DROP COLUMN "name",
DROP COLUMN "oracle_text",
DROP COLUMN "price",
DROP COLUMN "rarityId",
ADD COLUMN     "booster" BOOLEAN NOT NULL,
ADD COLUMN     "color_identity" TEXT[],
ADD COLUMN     "colors" TEXT[],
ADD COLUMN     "digital" BOOLEAN NOT NULL,
ADD COLUMN     "edhrec_rank" INTEGER,
ADD COLUMN     "finishes" TEXT[],
ADD COLUMN     "games" TEXT[],
ADD COLUMN     "image_uris" JSONB NOT NULL,
ADD COLUMN     "layout" TEXT NOT NULL,
ADD COLUMN     "legalities" JSONB NOT NULL,
ADD COLUMN     "mana_cost" TEXT,
ADD COLUMN     "oracale_text" TEXT NOT NULL,
ADD COLUMN     "prices" JSONB NOT NULL,
ADD COLUMN     "purchase_uris" JSONB NOT NULL,
ADD COLUMN     "rarity" TEXT NOT NULL,
ADD COLUMN     "related_uris" JSONB NOT NULL,
ADD COLUMN     "released_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "reprint" BOOLEAN NOT NULL,
ADD COLUMN     "rulings_uri" TEXT NOT NULL,
ADD COLUMN     "set" TEXT NOT NULL,
ADD COLUMN     "set_name" TEXT NOT NULL,
ADD COLUMN     "set_type" TEXT NOT NULL,
ADD COLUMN     "set_uri" TEXT NOT NULL,
ADD COLUMN     "type_line" TEXT NOT NULL,
ALTER COLUMN "power" SET NOT NULL;

-- DropTable
DROP TABLE "CardColor";

-- DropTable
DROP TABLE "CardSet";

-- DropTable
DROP TABLE "CardSubtype";

-- DropTable
DROP TABLE "CardSupertype";

-- DropTable
DROP TABLE "CardType";

-- DropTable
DROP TABLE "Color";

-- DropTable
DROP TABLE "Pack";

-- DropTable
DROP TABLE "PackType";

-- DropTable
DROP TABLE "Rarity";

-- DropTable
DROP TABLE "Subtype";

-- DropTable
DROP TABLE "Supertype";

-- DropTable
DROP TABLE "Type";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserCard";

-- DropTable
DROP TABLE "_CardSetToPackType";
