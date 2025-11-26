-- CreateTable
CREATE TABLE "Solicitacao" (
    "id" SERIAL NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Solicitacao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Solicitacao" ADD CONSTRAINT "Solicitacao_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
