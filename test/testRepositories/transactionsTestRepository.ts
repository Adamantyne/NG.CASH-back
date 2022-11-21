import supertest from "supertest";

import { TransactionInput } from "../../src/schemas/transactionsSchema";
import app from "../../src/app";

export async function postTransaction(data: TransactionInput, token:string) {
  return supertest(app).post(`/transactions`).send(data).set("Authorization", `Bearer ${token}`);
}

export async function getTransactions(token:string) {
    return supertest(app).get(`/transactions`).set("Authorization", `Bearer ${token}`);
  }
