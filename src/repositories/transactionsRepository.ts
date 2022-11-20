import db from "../config/database.js";
import { TransactionType } from "../schemas/transactionsSchema.js";

async function getTransactionsById(userId: number) {
  return await db.transaction.findMany({
    where: {
      OR: [{ debitedAccountId: userId }, { creditedAccountId: userId }],
    },
    orderBy: { createdAt: "desc" },
  });
}

async function postTransaction(transactionData: TransactionType) {
  return await db.transaction.create({ data: transactionData });
}

const transactionsRepository = { getTransactionsById, postTransaction };
export default transactionsRepository;
