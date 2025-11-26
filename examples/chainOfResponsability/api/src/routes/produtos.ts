import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const produtos = await prisma.produto.findMany({
      include: {
        categoria: true,
      },
    });
    res.json({ produtos });
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

export const produtoRoutes = router;
