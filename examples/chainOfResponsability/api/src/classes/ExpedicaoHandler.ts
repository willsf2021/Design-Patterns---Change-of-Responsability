import { AbstractHandler } from "../interfaces/AbstractHandler";
import { prisma } from "../lib/prisma";
export class ExpedicaoHandler extends AbstractHandler {
  async execute(solicitacao_id: number): Promise<any> {
    const aprovado = Math.random() > 0.5;

    if (aprovado) {
      await prisma.solicitacao.update({
        where: { id: solicitacao_id },
        data: { status: "Expedido, pronto para retirada!" },
      });
      console.log(`Produto expedido, pronto para retirada ${solicitacao_id}`);
      return {
        sucesso: "Solicitação concluída",
        solicitacao_id,
        status: "Expedido",
      };
    } else {
      await prisma.solicitacao.update({
        where: { id: solicitacao_id },
        data: { status: "Falha na expedição" },
      });
      return {
        erro: "Falha na expedição",
        solicitacao_id,
        handler: "ExpedicaoHandler",
      };
    }
  }
}
