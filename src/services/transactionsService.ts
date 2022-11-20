import accountRepository from "../repositories/accountRepository.js";
import transactionsRepository from "../repositories/transactionsRepository.js";
import { TransactionType } from "../schemas/transactionsSchema.js";

async function getTransactions(userId: number, filter) {
  return await transactionsRepository.getTransactionsById(userId);
}

async function postTransiction(transactionData: TransactionType) {
  const { value, creditedAccountId, debitedAccountId } = transactionData;
  await accountRepository.incrementBalanceById({id:creditedAccountId, value});
  await accountRepository.decrementBalanceById({id:debitedAccountId, value});
  await transactionsRepository.postTransaction(transactionData);
}

const transactionsService = { getTransactions, postTransiction };
export default transactionsService;
