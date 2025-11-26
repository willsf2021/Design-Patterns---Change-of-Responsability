import { Router } from "express";
import { prisma } from "../lib/prisma";

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

export const solicitacaoRoutes = router;
