import "dotenv/config";
import express from "express";
import { cors } from "./middleware/cors";
import { produtoRoutes } from "./routes/produtos";
import { categoriasRoutes } from "./routes/categorias";
import { solicitacaoRoutes } from "./routes/solicitacoes";

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors);
app.use(express.json());

// Rotas
app.use("/produtos", produtoRoutes);
app.use("/categorias", categoriasRoutes);
app.use("/solicitacoes", solicitacaoRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
