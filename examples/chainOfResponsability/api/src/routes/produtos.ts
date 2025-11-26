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

// Você pode adicionar mais rotas aqui depois
router.post("/", async (req, res) => {
  // Exemplo para futura implementação
  res.json({ message: "Produto criado" });
});

export const produtoRoutes = router;
