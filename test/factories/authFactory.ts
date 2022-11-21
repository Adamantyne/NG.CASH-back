import { faker } from "@faker-js/faker";

export function invalidSignUpData() {
  return {
    password: "1",
    confirmPassword: "1",
    username: faker.internet.userName(),
  };
}

export async function validSignUpData() {
  return {
    password: "Password1",
    confirmPassword: "Password1",
    username: faker.internet.userName(),
  };
}

export function invalidSignInData(){
  return{
    password: "1",
    username: faker.internet.userName(),
  }
}

export function validSignInData(){
  return{
    password: "Password1",
    username: faker.internet.userName(),
  }
}