import { error } from "console";
import { AbstractHandler } from "./AbstractHandler";
import { prisma } from "../lib/prisma";

export class ConferenciaHandler extends AbstractHandler {
  async execute(solicitacao_id: number): Promise<any> {
    const aprovado = Math.random() > 0.5;
    let response = {
      error: false,
      message: "",
    };
    if (aprovado) {
      response.message = "Produto alocado";
      await prisma.solicitacao.update({
        where: { id: solicitacao_id },
        data: { status: response.message },
      });
      console.log(`Conferência aprovada para solicitação ${solicitacao_id}`);
      return this.passToNext(solicitacao_id);
    } else {
      response.message = "Produto alocado";
      response.error = true;
      await prisma.solicitacao.update({
        where: { id: solicitacao_id },
        data: { status: response.message },
      });
      return response;
    }
  }
}
