import express, { Request, Response } from "express";
import "dotenv/config";

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.get("/hello", (req: Request, res: Response) => {
  res.json({ message: "API com TypeScript funcionando!" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});