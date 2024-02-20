/*
  Warnings:

  - You are about to drop the column `imgSrt` on the `Product` table. All the data in the column will be lost.
  - Added the required column `imgSrc` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "imgSrt",
ADD COLUMN     "imgSrc" TEXT NOT NULL;
