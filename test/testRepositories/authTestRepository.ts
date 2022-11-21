import supertest from "supertest";

import { SignInInput, SignUpInput } from "../../src/schemas/authSchemas";
import app from "../../src/app";

export async function signUp(data: SignUpInput) {
  return supertest(app).post(`/sign-up`).send(data);
}

export async function signIn(data: SignInInput) {
  return supertest(app).post(`/sign-in`).send(data);
}

export async function tokenValidate(token) {
  return supertest(app).get(`/token`).set("Authorization", `Bearer ${token}`);
}
