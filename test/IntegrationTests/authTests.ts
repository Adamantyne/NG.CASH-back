import {
  invalidSignInData,
  invalidSignUpData,
  validSignInData,
  validSignUpData,
} from "../factories/authFactory";
import { buildingValidUser } from "../factories/userFactory";
import { signIn, signUp, tokenValidate } from "../testRepositories/authTestRepository";

async function validSignIn() {
  return describe("valid signin", () => {
    it("trying to signin with valid data", async () => {
      const { username, password } = await buildingValidUser();
      const response = await signIn({ username, password });
      expect(response.statusCode).toBe(201);
    });
  });
}

async function invalidSignIn() {
  return describe("invalid signin", () => {
    it("trying to signin with an invalid data", async () => {
      const invalidData = invalidSignInData();
      const response = await signIn(invalidData);
      expect(response.statusCode).toBe(422);
    });
    it("trying to signin with a unregistred username", async () => {
      const validData = validSignInData();
      const response = await signIn(validData);
      expect(response.statusCode).toBe(401);
    });
    it("trying to signin with wrong password", async () => {
      const signUpData = await validSignUpData();
      await signUp(signUpData);
      const { username } = signUpData;
      const response = await signIn({ username, password: "WrongPassword1" });
      expect(response.statusCode).toBe(401);
    });
  });
}

async function validSignUp() {
  return describe("valid signup", () => {
    it("trying to signup with valid data", async () => {
      const signUpData = await validSignUpData();
      const response = await signUp(signUpData);
      expect(response.statusCode).toBe(201);
    });
  });
}

async function invalidSignUp() {
  return describe("invalid signup", () => {
    it("trying to signup with invalid data", async () => {
      const signUpData = invalidSignUpData();
      const response = await signUp(signUpData);
      expect(response.statusCode).toBe(422);
    });

    it("trying to signup with existing user", async () => {
      const signUpData = await validSignUpData();
      await signUp(signUpData);
      const response = await signUp(signUpData);
      expect(response.statusCode).toBe(409);
    });
  });
}

async function checkToken() {
  return describe("check token", () => {
    it("check invalid token", async () => {
      const response = await tokenValidate("invalid token")
      expect(response.statusCode).toBe(401);
    });

    it("check valid token", async () => {
      const { username, password } = await buildingValidUser();
      let response = await signIn({ username, password });
      const {token} = JSON.parse(response.text);
      response = await tokenValidate(token);
      expect(response.statusCode).toBe(200);
    });
  });
}

export function authTests() {
  invalidSignUp();
  validSignUp();
  invalidSignIn();
  validSignIn();
  checkToken();
}
