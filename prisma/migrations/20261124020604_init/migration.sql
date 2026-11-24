-- CreateTable
CREATE TABLE "Truk" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "platNomor" TEXT NOT NULL,
    "jenis" TEXT NOT NULL,
    "kapasitas" INTEGER NOT NULL,
    "status" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Truk_platNomor_key" ON "Truk"("platNomor");
