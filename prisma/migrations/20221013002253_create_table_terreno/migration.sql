-- CreateTable
CREATE TABLE "Terreno" (
    "idTerreno" TEXT NOT NULL PRIMARY KEY,
    "cep" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "complemento" TEXT NOT NULL,
    "metragem" TEXT NOT NULL,
    "tituloCard" TEXT NOT NULL,
    "descricaoCard" TEXT NOT NULL,
    "uploadImagem" BLOB NOT NULL,
    "uploadEscritura" BLOB NOT NULL,
    "Comodatario_idComodatario" TEXT NOT NULL,
    "Comodante_idComodante" TEXT NOT NULL,
    CONSTRAINT "Terreno_Comodatario_idComodatario_fkey" FOREIGN KEY ("Comodatario_idComodatario") REFERENCES "Comodatario" ("idComodatario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Terreno_Comodante_idComodante_fkey" FOREIGN KEY ("Comodante_idComodante") REFERENCES "Comodante" ("idComodante") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Terreno_Comodatario_idComodatario_key" ON "Terreno"("Comodatario_idComodatario");
