import { Request, Response } from "express";
import { TransactionType } from "../schemas/transactionsSchema.js";

import transactionsService from "../services/transactionsService.js";

export async function getTransactions(req: Request, res: Response) {
  const { userId }: { userId: number } = res.locals.userId;
  const { filter } = req.query;
  const transactions = await transactionsService.getTransactions(
    userId,
    filter
  );
  res.status(200).send(transactions);
}

export async function postTransaction(req: Request, res: Response) {
  const transactionData: TransactionType = res.locals.transactionData;
  await transactionsService.postTransiction(transactionData);
  res.status(201).send("transactions");
}

export async function getTransactionsByDate(req: Request, res: Response) {
  const { userId }: { userId: number } = res.locals.userId;
  const { filter } = req.query;
  const { date } = req.params;
  const transactions = await transactionsService.getTransactionsByDate(
    userId,
    filter,
    date
  );
  res.status(200).send(transactions);
}
