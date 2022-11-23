import db from "../config/database.js";
import { TransactionType } from "../schemas/transactionsSchema.js";

async function getTransactionsById(userId: number) {
  return await db.transaction.findMany({
    where: {
      OR: [{ debitedAccountId: userId }, { creditedAccountId: userId }],
    },
    select: {
      id: true,
      value: true,
      createdAt: true,
      creditedAccountId: true,
      debitedAccountId: true,
      credited: {
        select: {
          users: {
            select: {
              username: true,
            },
          },
        },
      },
      debited: {
        select: {
          users: {
            select: {
              username: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

async function getDebitedTransactions(userId: number) {
  return await db.transaction.findMany({
    where: {
      debitedAccountId: userId,
    },
    select: {
      id: true,
      value: true,
      createdAt: true,
      creditedAccountId: true,
      debitedAccountId: true,
      credited: {
        select: {
          users: {
            select: {
              username: true,
            },
          },
        },
      },
      debited: {
        select: {
          users: {
            select: {
              username: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

async function getCreditedTransactions(userId: number) {
  return await db.transaction.findMany({
    where: {
      creditedAccountId: userId,
    },
    select: {
      id: true,
      value: true,
      createdAt: true,
      creditedAccountId: true,
      debitedAccountId: true,
      credited: {
        select: {
          users: {
            select: {
              username: true,
            },
          },
        },
      },
      debited: {
        select: {
          users: {
            select: {
              username: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

async function postTransaction(transactionData: TransactionType) {
  return await db.transaction.create({ data: transactionData });
}

const transactionsRepository = {
  getTransactionsById,
  postTransaction,
  getDebitedTransactions,
  getCreditedTransactions,
};
export default transactionsRepository;
