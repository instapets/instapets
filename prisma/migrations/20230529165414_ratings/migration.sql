-- CreateTable
CREATE TABLE "Ratings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "postId" INTEGER NOT NULL,
    "userId" TEXT,
    "like" INTEGER NOT NULL,
    "unlike" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Ratings_userId_key" ON "Ratings"("userId");
