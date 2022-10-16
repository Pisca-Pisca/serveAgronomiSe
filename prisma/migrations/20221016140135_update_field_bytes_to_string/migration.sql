-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Conteudo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "imagem" TEXT NOT NULL
);
INSERT INTO "new_Conteudo" ("descricao", "id", "imagem", "link", "titulo") SELECT "descricao", "id", "imagem", "link", "titulo" FROM "Conteudo";
DROP TABLE "Conteudo";
ALTER TABLE "new_Conteudo" RENAME TO "Conteudo";
CREATE TABLE "new_Terreno" (
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
    "uploadImagem" TEXT NOT NULL,
    "uploadEscritura" TEXT NOT NULL,
    "Comodatario_idComodatario" TEXT NOT NULL,
    "Comodante_idComodante" TEXT NOT NULL,
    CONSTRAINT "Terreno_Comodatario_idComodatario_fkey" FOREIGN KEY ("Comodatario_idComodatario") REFERENCES "Comodatario" ("idComodatario") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Terreno_Comodante_idComodante_fkey" FOREIGN KEY ("Comodante_idComodante") REFERENCES "Comodante" ("idComodante") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Terreno" ("Comodante_idComodante", "Comodatario_idComodatario", "bairro", "cep", "cidade", "complemento", "descricaoCard", "endereco", "idTerreno", "metragem", "numero", "tituloCard", "uploadEscritura", "uploadImagem") SELECT "Comodante_idComodante", "Comodatario_idComodatario", "bairro", "cep", "cidade", "complemento", "descricaoCard", "endereco", "idTerreno", "metragem", "numero", "tituloCard", "uploadEscritura", "uploadImagem" FROM "Terreno";
DROP TABLE "Terreno";
ALTER TABLE "new_Terreno" RENAME TO "Terreno";
CREATE UNIQUE INDEX "Terreno_Comodatario_idComodatario_key" ON "Terreno"("Comodatario_idComodatario");
CREATE TABLE "new_Comodante" (
    "idComodante" TEXT NOT NULL PRIMARY KEY,
    "primeiroNomeComodante" TEXT NOT NULL,
    "sobrenomeComodante" TEXT NOT NULL,
    "emailComodante" TEXT NOT NULL,
    "senhaComodante" TEXT NOT NULL,
    "nascimentoComodante" TEXT NOT NULL,
    "cpfComodante" TEXT NOT NULL,
    "rgComodante" TEXT NOT NULL,
    "enderecoComodante" TEXT NOT NULL,
    "cidadeEstadoComodante" TEXT NOT NULL,
    "uploadRgComodante" TEXT NOT NULL,
    "uploadCpfComodante" TEXT NOT NULL,
    "uploadComprovanteEnderecoComodante" TEXT NOT NULL
);
INSERT INTO "new_Comodante" ("cidadeEstadoComodante", "cpfComodante", "emailComodante", "enderecoComodante", "idComodante", "nascimentoComodante", "primeiroNomeComodante", "rgComodante", "senhaComodante", "sobrenomeComodante", "uploadComprovanteEnderecoComodante", "uploadCpfComodante", "uploadRgComodante") SELECT "cidadeEstadoComodante", "cpfComodante", "emailComodante", "enderecoComodante", "idComodante", "nascimentoComodante", "primeiroNomeComodante", "rgComodante", "senhaComodante", "sobrenomeComodante", "uploadComprovanteEnderecoComodante", "uploadCpfComodante", "uploadRgComodante" FROM "Comodante";
DROP TABLE "Comodante";
ALTER TABLE "new_Comodante" RENAME TO "Comodante";
CREATE UNIQUE INDEX "Comodante_emailComodante_key" ON "Comodante"("emailComodante");
CREATE UNIQUE INDEX "Comodante_cpfComodante_key" ON "Comodante"("cpfComodante");
CREATE TABLE "new_Comodatario" (
    "idComodatario" TEXT NOT NULL PRIMARY KEY,
    "primeiroNomeComodatario" TEXT NOT NULL,
    "sobrenomeComodatario" TEXT NOT NULL,
    "emailComodatario" TEXT NOT NULL,
    "senhaComodatario" TEXT NOT NULL,
    "nascimentoComodatario" TEXT NOT NULL,
    "cpfComodatario" TEXT NOT NULL,
    "rgComodatario" TEXT NOT NULL,
    "enderecoComodatario" TEXT NOT NULL,
    "cidadeEstadoComodatario" TEXT NOT NULL,
    "uploadRgComodatario" TEXT NOT NULL,
    "uploadCpfComodatario" TEXT NOT NULL,
    "uploadComprovanteEnderecoComodatario" TEXT NOT NULL
);
INSERT INTO "new_Comodatario" ("cidadeEstadoComodatario", "cpfComodatario", "emailComodatario", "enderecoComodatario", "idComodatario", "nascimentoComodatario", "primeiroNomeComodatario", "rgComodatario", "senhaComodatario", "sobrenomeComodatario", "uploadComprovanteEnderecoComodatario", "uploadCpfComodatario", "uploadRgComodatario") SELECT "cidadeEstadoComodatario", "cpfComodatario", "emailComodatario", "enderecoComodatario", "idComodatario", "nascimentoComodatario", "primeiroNomeComodatario", "rgComodatario", "senhaComodatario", "sobrenomeComodatario", "uploadComprovanteEnderecoComodatario", "uploadCpfComodatario", "uploadRgComodatario" FROM "Comodatario";
DROP TABLE "Comodatario";
ALTER TABLE "new_Comodatario" RENAME TO "Comodatario";
CREATE UNIQUE INDEX "Comodatario_emailComodatario_key" ON "Comodatario"("emailComodatario");
CREATE UNIQUE INDEX "Comodatario_cpfComodatario_key" ON "Comodatario"("cpfComodatario");
CREATE TABLE "new_Parceiro" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "linkRedirecionamento" TEXT NOT NULL,
    "logoParceiro" TEXT NOT NULL
);
INSERT INTO "new_Parceiro" ("id", "linkRedirecionamento", "logoParceiro") SELECT "id", "linkRedirecionamento", "logoParceiro" FROM "Parceiro";
DROP TABLE "Parceiro";
ALTER TABLE "new_Parceiro" RENAME TO "Parceiro";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
