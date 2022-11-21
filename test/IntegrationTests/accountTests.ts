import { buildingValidUser } from "../factories/userFactory";
import { getBalance } from "../testRepositories/accountTestRepository";
import { signIn, signUp } from "../testRepositories/authTestRepository";

async function validAccountTests() {
  return describe("valid signip", () => {
    it("trying to get balance with valid token", async () => {
      const { username, password } = await buildingValidUser();
      let response = await signIn({ username, password });
      const {token} = JSON.parse(response.text);
      response = await getBalance(token);
      expect(response.statusCode).toBe(200);
      const {balance} = JSON.parse(response.text);
      expect(typeof(balance)).toBe("number");
    });
  });
}

async function invalidAccountTests() {
  return describe("invalid signin", () => {
    it("trying to get balance without token", async () => {
      const response = await getBalance();
      expect(response.statusCode).toBe(401);
    });
    it("trying to get balance with invalid token", async () => {
      const response = await getBalance("Invalid Token");
      expect(response.statusCode).toBe(401);
    });
  });
}

export function accountTests() {
    invalidAccountTests();
    validAccountTests();
}
