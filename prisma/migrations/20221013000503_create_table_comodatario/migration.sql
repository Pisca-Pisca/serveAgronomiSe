-- CreateTable
CREATE TABLE "Comodatario" (
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
    "uploadRgComodatario" BLOB NOT NULL,
    "uploadCpfComodatario" BLOB NOT NULL,
    "uploadComprovanteEnderecoComodatario" BLOB NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Comodatario_emailComodatario_key" ON "Comodatario"("emailComodatario");

-- CreateIndex
CREATE UNIQUE INDEX "Comodatario_cpfComodatario_key" ON "Comodatario"("cpfComodatario");
