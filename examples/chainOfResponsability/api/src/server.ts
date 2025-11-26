import "dotenv/config";
import express from "express";
import { cors } from "./middleware/cors";
import { produtoRoutes } from "./routes/produtos";

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors);
app.use(express.json());

// Rotas
app.get("/hello", (req, res) => {
  res.json({ message: "API com TypeScript funcionando!" });
});

app.use("/produtos", produtoRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
