import dayjs from "dayjs";
import accountRepository from "../repositories/accountRepository.js";
import transactionsRepository from "../repositories/transactionsRepository.js";
import { TransactionType } from "../schemas/transactionsSchema.js";

async function getTransactions(userId: number, filter) {
  if (filter === "debited") {
    return await transactionsRepository.getDebitedTransactions(userId);
  } else if (filter === "credited") {
    return await transactionsRepository.getCreditedTransactions(userId);
  } else {
    return await transactionsRepository.getTransactionsById(userId);
  }
}

async function getTransactionsByDate(userId: number, filter, date: string) {
  let transactions = await getTransactions(userId, filter);
  transactions = transactions.filter((transaction) => {
    return dayjs(transaction.createdAt).format("DD-MM-YYYY") === date;
  });
  return transactions;
}

async function postTransiction(transactionData: TransactionType) {
  const { value, creditedAccountId, debitedAccountId } = transactionData;
  await accountRepository.incrementBalanceById({
    id: creditedAccountId,
    value,
  });
  await accountRepository.decrementBalanceById({ id: debitedAccountId, value });
  await transactionsRepository.postTransaction(transactionData);
}

const transactionsService = {
  getTransactions,
  postTransiction,
  getTransactionsByDate,
};
export default transactionsService;
