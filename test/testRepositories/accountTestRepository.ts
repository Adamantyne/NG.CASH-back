import supertest from "supertest";

import { AccountType } from "../../src/schemas/accountSchema.js";
import app from "../../src/app";
import db from "../../src/config/database.js";

export async function createAccount(data: AccountType) {
  return await db.account.create({ data });
}

export async function getBalance(token?:string) {
  return token
    ? supertest(app).get(`/balance`).set("Authorization", `Bearer ${token}`)
    : supertest(app).get(`/balance`);
}
