-- CreateTable
CREATE TABLE "Calendar" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "dateRange" BOOLEAN NOT NULL DEFAULT false,
    "dateStart" DATETIME NOT NULL,
    "dateEnd" DATETIME NOT NULL,
    "place" TEXT NOT NULL
);
