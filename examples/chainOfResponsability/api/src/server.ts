import express, {Request, Response} from "express";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/hello", (req: Request, res: Response) => {
  res.json({ message: "API com TypeScript funcionando!"});
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});