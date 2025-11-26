import { AbstractHandler } from "./AbstractHandler";
import { prisma } from "../lib/prisma";

export class EstoqueHandler extends AbstractHandler {
  async execute(solicitacao_id: number): Promise<any> {
    let response = {
      error: false,
      message: "",
    };
    try {
      const solicitacao = await prisma.solicitacao.findUnique({
        where: { id: solicitacao_id },
        include: { produto: true },
      });

      if (!solicitacao) {
        response.message = "Solicitação não encontrada";
        response.error = true;
        await prisma.solicitacao.update({
          where: { id: solicitacao_id },
          data: { status: response.message },
        });
        return response;
      }

      // Busca o estoque do produto
      const estoque = await prisma.estoque.findUnique({
        where: { produto_id: solicitacao.produto_id },
      });

      if (!estoque) {
        response.message = "Produto sem registro de estoque";
        response.error = true;
        await prisma.solicitacao.update({
          where: { id: solicitacao_id },
          data: { status: response.message },
        });
        return response;
      }

      // Verifica se tem estoque suficiente
      if (estoque.quantidade >= solicitacao.quantidade) {
        await prisma.solicitacao.update({
          where: { id: solicitacao_id },
          data: { status: "Estoque disponível" },
        });
        console.log(
          `Estoque suficiente: ${estoque.quantidade} >= ${solicitacao.quantidade}`
        );
        return this.passToNext(solicitacao_id);
      } else {
        response.message = "Estoque insuficiente";
        response.error = true;
        await prisma.solicitacao.update({
          where: { id: solicitacao_id },
          data: { status: response.message },
        });
        return response;
      }
    } catch (error) {
      response.message = "Erro ao verificar estoque";
      response.error = true;
      await prisma.solicitacao.update({
        where: { id: solicitacao_id },
        data: { status: response.message },
      });

      return response;
    }
  }
}
