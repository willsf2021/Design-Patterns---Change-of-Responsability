import { Router } from "express";
import { prisma } from "../lib/prisma";
import { EstoqueHandler } from "../classes/EstoqueHandler";
import { AlocacaoHandler } from "../classes/AlocacaoHandler";
import { SeparacaoHandler } from "../classes/SeparacaoHandler";
import { ConferenciaHandler } from "../classes/ConferenciaHandler";
import { ExpedicaoHandler } from "../classes/ExpedicaoHandler";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const solicitacoes = await prisma.solicitacao.findMany({
      include: {
        produto: true,
      },
    });
    res.json({ solicitacoes });
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.post("/criar", async (req, res) => {
  try {
    const { produto_id, quantidade } = req.body;

    const solicitacao = await prisma.solicitacao.create({
      data: {
        produto_id: Number(produto_id),
        quantidade: Number(quantidade),
        status: "Pendente",
      },
    });

    const solicitacao_id = solicitacao.id;

    const estoqueHandler = new EstoqueHandler();
    const alocacaoHandler = new AlocacaoHandler();
    const separacaoHandler = new SeparacaoHandler();
    const conferenciaHandler = new ConferenciaHandler();
    const expedicaoHandler = new ExpedicaoHandler();

    estoqueHandler.setNext(alocacaoHandler);
    alocacaoHandler.setNext(separacaoHandler);
    separacaoHandler.setNext(conferenciaHandler);
    conferenciaHandler.setNext(expedicaoHandler);

    const resultado = await estoqueHandler.execute(solicitacao_id);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

export const solicitacaoRoutes = router;
