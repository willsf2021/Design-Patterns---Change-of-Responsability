import { AbstractHandler } from "../interfaces/AbstractHandler";
import { prisma } from "../lib/prisma";

export class AlocacaoHandler extends AbstractHandler {
  async execute(solicitacao_id: number): Promise<any> {
    const aprovado = Math.random() > 0.5;
    
    if (aprovado) {
      await prisma.solicitacao.update({
        where: { id: solicitacao_id },
        data: { status: "Produto alocado" }
      });
      console.log(`📦 Produto alocado para solicitação ${solicitacao_id}`);
      return this.passToNext(solicitacao_id);
    } else {
      await prisma.solicitacao.update({
        where: { id: solicitacao_id },
        data: { status: "Falha na alocação" }
      });
      return { 
        erro: "Falha na alocação", 
        solicitacao_id,
        handler: "AlocacaoHandler" 
      };
    }
  }
}