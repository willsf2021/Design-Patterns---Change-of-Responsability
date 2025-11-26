import { AbstractHandler } from "./AbstractHandler";
import { prisma } from "../lib/prisma";
export class ExpedicaoHandler extends AbstractHandler {
  async execute(solicitacao_id: number): Promise<any> {
    const aprovado = Math.random() > 0.5;
    let response = {
      error: false,
      message: "",
    };

    if (aprovado) {
      response.message = "Expedido, pronto para retirada!";
      await prisma.solicitacao.update({
        where: { id: solicitacao_id },
        data: { status: response.message },
      });
    } else {
      response.error = true;
      response.message = "Falha na expedição";
      await prisma.solicitacao.update({
        where: { id: solicitacao_id },
        data: { status: response.message },
      });
    }
    return response;
  }
}
