import { AbstractHandler } from "../interfaces/AbstractHandler";
import { prisma } from "../lib/prisma";

export class SeparacaoHandler extends AbstractHandler {
  async execute(solicitacao_id: number): Promise<any> {
    const aprovado = Math.random() > 0.5;
    
    if (aprovado) {
      await prisma.solicitacao.update({
        where: { id: solicitacao_id },
        data: { status: "Pronto para retirada" }
      });
      console.log(`Produto separado para solicitação ${solicitacao_id}`);
      return this.passToNext(solicitacao_id);
    } else {
      await prisma.solicitacao.update({
        where: { id: solicitacao_id },
        data: { status: "Falha na separação" }
      });
      return { 
        erro: "Falha na separação", 
        solicitacao_id,
        handler: "SeparacaoHandler" 
      };
    }
  }
}