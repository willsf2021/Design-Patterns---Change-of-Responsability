/*
  Warnings:

  - Added the required column `quantidade` to the `Solicitacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Solicitacao" ADD COLUMN     "quantidade" INTEGER NOT NULL;
