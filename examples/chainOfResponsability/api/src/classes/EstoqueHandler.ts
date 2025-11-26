import { AbstractHandler } from "../interfaces/AbstractHandler";
import { prisma } from "../lib/prisma";

export class EstoqueHandler extends AbstractHandler {
  async execute(solicitacao_id: number): Promise<any> {
    try {
      // Busca a solicitação para pegar produto_id e quantidade
      const solicitacao = await prisma.solicitacao.findUnique({
        where: { id: solicitacao_id },
        include: { produto: true },
      });

      if (!solicitacao) {
        await prisma.solicitacao.update({
          where: { id: solicitacao_id },
          data: { status: "Solicitação não encontrada" },
        });
        return {
          erro: "Solicitação não encontrada",
          solicitacao_id,
          handler: "EstoqueHandler",
        };
      }

      // Busca o estoque do produto
      const estoque = await prisma.estoque.findUnique({
        where: { produto_id: solicitacao.produto_id },
      });

      if (!estoque) {
        await prisma.solicitacao.update({
          where: { id: solicitacao_id },
          data: { status: "Produto sem registro de estoque" },
        });
        return {
          erro: "Produto sem registro de estoque",
          solicitacao_id,
          handler: "EstoqueHandler",
        };
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
        await prisma.solicitacao.update({
          where: { id: solicitacao_id },
          data: { status: "Estoque insuficiente" },
        });
        return {
          erro: "Estoque insuficiente",
          solicitacao_id,
          handler: "EstoqueHandler",
          disponivel: estoque.quantidade,
          solicitado: solicitacao.quantidade,
        };
      }
    } catch (error) {
      await prisma.solicitacao.update({
        where: { id: solicitacao_id },
        data: { status: "Erro ao verificar estoque" },
      });
      return {
        erro: "Falha ao consultar estoque",
        solicitacao_id,
        handler: "EstoqueHandler",
        detalhes: error,
      };
    }
  }
}
