import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const categorias = await prisma.categoria.findMany();
    res.json({ categorias });
  } catch (error) {
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.get("/:id/produtos", async (req, res) => {
  const produtos = await prisma.produto.findMany({
    where: { categoria_id: Number(req.params.id) },
  });

  res.json({ produtos });
});

export const categoriasRoutes = router;
