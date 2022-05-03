/*
  Warnings:

  - Added the required column `category` to the `Menu_Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Menu_Item" ADD COLUMN     "category" VARCHAR(50) NOT NULL,
ADD COLUMN     "chefRecommendation" BOOLEAN NOT NULL DEFAULT false;
