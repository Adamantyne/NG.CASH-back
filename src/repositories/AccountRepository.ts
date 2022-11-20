import db from "../config/database.js";
import { AccountType } from "../schemas/accountSchema.js";

async function createAccount(initialBalance: number) {
  const balance: AccountType = { balance: initialBalance };
  return await db.account.create({ data: balance });
}

async function getAccountById(userId: number) {
  return await db.account.findUnique({where:{id:userId}});
}

const accountRepository = { createAccount, getAccountById };
export default accountRepository;
