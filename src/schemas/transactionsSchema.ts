import Joi from "joi";
import { Transaction } from "@prisma/client";

export interface TransactionInput extends Omit<
TransactionType,
"debitedAccountId"|"creditedAccountId"
>{
  creditedUsername: string;
}
export type TransactionType = Omit<Transaction, "id" | "createdAt">;


export const transactionSchema = Joi.object<TransactionInput>({
  value: Joi.number().required(),
  creditedUsername: Joi.string().required(),
});
