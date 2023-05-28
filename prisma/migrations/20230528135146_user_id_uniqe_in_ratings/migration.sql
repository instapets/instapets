/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Ratings` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Ratings_postId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Ratings_userId_key" ON "Ratings"("userId");
