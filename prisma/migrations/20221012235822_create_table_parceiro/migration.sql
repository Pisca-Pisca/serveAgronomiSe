/*
  Warnings:

  - You are about to drop the `conteudo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "conteudo";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Conteudo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "imagem" BLOB NOT NULL
);

-- CreateTable
CREATE TABLE "Parceiro" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "linkRedirecionamento" TEXT NOT NULL,
    "logoParceiro" BLOB NOT NULL
);
