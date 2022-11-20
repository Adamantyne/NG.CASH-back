import db from "../config/database.js";
import { AccountType } from "../schemas/accountSchema.js";

async function createAccount(initialBalance: number) {
  const balance: AccountType = { balance: initialBalance };
  return await db.account.create({ data: balance });
}

async function getAccountById(userId: number) {
  return await db.account.findUnique({ where: { id: userId } });
}

async function decrementBalanceById({
  id,
  value,
}: {
  id: number;
  value: number;
}) {
  return await db.account.update({
    where: { id },
    data: {
      balance: {
        decrement: value,
      },
    },
  });
}

async function incrementBalanceById({
  id,
  value,
}: {
  id: number;
  value: number;
}) {
  return await db.account.update({
    where: { id },
    data: {
      balance: {
        increment: value,
      },
    },
  });
}

const accountRepository = {
  createAccount,
  getAccountById,
  decrementBalanceById,
  incrementBalanceById,
};
export default accountRepository;
