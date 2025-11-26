import { AbstractHandler } from "../interfaces/AbstractHandler";
import { prisma } from "../lib/prisma";

export class ConferenciaHandler extends AbstractHandler {
  async execute(solicitacao_id: number): Promise<any> {
    const aprovado = Math.random() > 0.5;

    if (aprovado) {
      await prisma.solicitacao.update({
        where: { id: solicitacao_id },
        data: { status: "Em conferência" },
      });
      console.log(`Conferência aprovada para solicitação ${solicitacao_id}`);
      return this.passToNext(solicitacao_id);
    } else {
      await prisma.solicitacao.update({
        where: { id: solicitacao_id },
        data: { status: "Falha na conferência" },
      });
      return {
        erro: "Falha na conferência",
        solicitacao_id,
        handler: "ConferenciaHandler",
      };
    }
  }
}
