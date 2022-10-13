-- CreateTable
CREATE TABLE "Comodante" (
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
    "uploadRgComodante" BLOB NOT NULL,
    "uploadCpfComodante" BLOB NOT NULL,
    "uploadComprovanteEnderecoComodante" BLOB NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Comodante_emailComodante_key" ON "Comodante"("emailComodante");

-- CreateIndex
CREATE UNIQUE INDEX "Comodante_cpfComodante_key" ON "Comodante"("cpfComodante");
