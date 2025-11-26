-- CreateTable
CREATE TABLE "Estoque" (
    "id" SERIAL NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Estoque_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Estoque_produto_id_key" ON "Estoque"("produto_id");

-- AddForeignKey
ALTER TABLE "Estoque" ADD CONSTRAINT "Estoque_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
