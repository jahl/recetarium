/*
  Warnings:

  - You are about to drop the column `measuring_unit` on the `IngredienstOnRecipes` table. All the data in the column will be lost.
  - Added the required column `measuringUnit` to the `IngredienstOnRecipes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IngredienstOnRecipes" DROP COLUMN "measuring_unit",
ADD COLUMN     "measuringUnit" TEXT NOT NULL;
