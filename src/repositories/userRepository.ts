import db from "../config/database.js";

import { SignInData } from "../schemas/authSchemas.js";

async function findByUsername(username: string) {
  return await db.user.findUnique({ where: { username } });
}

async function findByUsernameAndId(username: string, id: number) {
  return await db.user.findFirst({ where: { username, id } });
}

async function createUser(inputData: SignInData) {
  return await db.user.create({ data: inputData });
}

async function FindAccountIdByUsername(username: string) {
  return await db.user.findUnique({
    where: {
      username,
    },
    select: {
      accountId: true,
      account: {
        select: {
          balance: true,
        },
      },
    },
  });
}

const userRepository = {
  findByUsername,
  createUser,
  findByUsernameAndId,
  FindAccountIdByUsername,
};
export default userRepository;
