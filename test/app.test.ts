import prisma from "../src/config/database.js";
import supertest from "supertest";
import app from "../src/app.js";
import { authTests } from "./IntegrationTests/authTests.js";
import { accountTests } from "./IntegrationTests/accountTests.js";
import { transactionsTests } from "./IntegrationTests/transactionTest.js";



beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE sessions, users, transactions, accounts;`;
});

describe("generic tests", () => {
  it("return not found", async () => {
    const response = await supertest(app).get("/not_found");
    expect(response.statusCode).toEqual(404);
  });
});

authTests();
accountTests();
transactionsTests();

afterAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE sessions, Users, transactions, accounts;`;
  await prisma.$disconnect();
});