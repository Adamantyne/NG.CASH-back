import bcrypt from "bcrypt";
import { User } from "@prisma/client";

import userRepository from "../repositories/userRepository.js";
import { createToken } from "../utils/suportFunctions.js";
import { SignInData } from "../schemas/authSchemas.js";
import sessionRepository from "../repositories/sessionRepository.js";
import accountRepository from "../repositories/accountRepository.js";

async function createUser({ password, username }: SignInData) {
  const sault = 10;
  const encryptedPassword = bcrypt.hashSync(password, sault);
  const insertUserData = { username, password: encryptedPassword };
  const { id: accountId } = await accountRepository.createAccount(10000);
  await userRepository.createUser({ ...insertUserData, accountId });
}

async function createSession({ username, id }: User) {
  const token = createToken({ username, id });
  await invalidatingLastSession(id);
  await sessionRepository.createSession({ userId: id, token });
  return token;
}

async function invalidatingLastSession(id: number) {
  const lastSession = await sessionRepository.findLastSession(id);
  if (lastSession) {
    await sessionRepository.invalidatingSessionById(lastSession.id);
  }
}

async function getUserInfos(username: string) {
  const userInfos = await userRepository.findByUsername(username);
  delete userInfos.password;
  delete userInfos.id;
  return userInfos;
}

const authServices = {
  createUser,
  createSession,
  invalidatingLastSession,
  getUserInfos,
};
export default authServices;
