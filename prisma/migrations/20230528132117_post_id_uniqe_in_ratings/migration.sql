/*
  Warnings:

  - A unique constraint covering the columns `[postId]` on the table `Ratings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Ratings_postId_key" ON "Ratings"("postId");
