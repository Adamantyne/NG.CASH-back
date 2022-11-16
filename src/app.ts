import express, { json, Request, Response } from "express";
import prisma from "./config/database.js";

const app = express();
app.use(json());

app.get("/health", async (req: Request, res: Response) => {
  const user = await prisma.user.findFirst({});
  res.send(`user: ${user}`);
});

export default app;

//testes workflow 1