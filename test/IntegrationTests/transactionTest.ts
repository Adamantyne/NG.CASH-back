import { buildingValidUser } from "../factories/userFactory";
import { getBalance } from "../testRepositories/accountTestRepository";
import { signIn } from "../testRepositories/authTestRepository";
import {
  getTransactions,
  postTransaction,
} from "../testRepositories/transactionsTestRepository";

async function validTransactionsTests() {
  return describe("valid transactions", () => {
    it("trying to post and get a valid transaction", async () => {
      const { username: debitedUsername, password: debitedPassword } =
        await buildingValidUser();
      const { username: creditedUsername } = await buildingValidUser();

      let response = await signIn({
        username: debitedUsername,
        password: debitedPassword,
      });

      const { token } = JSON.parse(response.text);
      response = await getBalance(token);
      const { balance } = JSON.parse(response.text);

      response = await postTransaction(
        { value: balance, creditedUsername },
        token
      );
      expect(response.statusCode).toBe(201);

      response = await getTransactions(token);
      expect(response.statusCode).toBe(200);

      const transactions = JSON.parse(response.text);
      expect(transactions.length).toBe(1);
      expect(typeof transactions[0].id).toBe("number");
    });
  });
}

async function invalidTransactionsTests() {
  return describe("invalid transactions", () => {
    it("trying to make a transaction to an invalid user", async () => {
      const { username: debitedUsername, password: debitedPassword } =
        await buildingValidUser();

      let response = await signIn({
        username: debitedUsername,
        password: debitedPassword,
      });

      const { token } = JSON.parse(response.text);
      response = await getBalance(token);
      const { balance } = JSON.parse(response.text);

      response = await postTransaction(
        { value: balance, creditedUsername: "invalid username" },
        token
      );

      expect(response.statusCode).toBe(404);
    });
    it("trying to make a transaction with insuficient funds", async () => {
      const { username: debitedUsername, password: debitedPassword } =
        await buildingValidUser();
      const { username: creditedUsername } = await buildingValidUser();

      let response = await signIn({
        username: debitedUsername,
        password: debitedPassword,
      });

      const { token } = JSON.parse(response.text);
      response = await getBalance(token);
      const { balance } = JSON.parse(response.text);

      response = await postTransaction(
        { value: balance + 1, creditedUsername },
        token
      );

      expect(response.statusCode).toBe(409);
    });
  });
}

export function transactionsTests() {
  invalidTransactionsTests();
  validTransactionsTests();
}
