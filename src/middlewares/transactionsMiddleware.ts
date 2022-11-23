import { NextFunction, Request, Response } from "express";

import {
  TransactionInput,
} from "../schemas/transactionsSchema.js";
import { throwErr } from "../utils/suportFunctions.js";
import userRepository from "../repositories/userRepository.js";

export async function postTransactionMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId }: { userId: number } = res.locals.userId;
  const transactionData: TransactionInput = req.body;
  let { value } = transactionData;
  if(typeof(value)!=="number"){
    value===parseFloat(value);
  }
  
  const creditedAccountId = await transactionValidate(transactionData, userId);

  res.locals.transactionData = {
    creditedAccountId,
    debitedAccountId: userId,
    value,
  };

  next();
}

async function transactionValidate(
  { value, creditedUsername }: TransactionInput,
  userId: number
) {
  const accountData = await userRepository.FindAccountIdByUsername(
    creditedUsername
  );

  if (!accountData) {
    throwErr("not_found", "username does not exist");
  } else if (userId === accountData.accountId) {
    throwErr("conflict", "you cannot transfer to yourself");
  } else if (value > accountData.account.balance) {
    throwErr("conflict", "insufficient funds");
  } else {
    return accountData.accountId;
  }
}
