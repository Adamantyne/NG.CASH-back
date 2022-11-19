import db from "../config/database.js";

import { SessionData } from "../schemas/authSchemas.js";

async function findByTokenAndId({userId,token}:SessionData) {
  return await db.session.findFirst({
    where: {
      userId,
      token:token,
      logoutAt: null,
    },
  });
}

async function findLastSession(userId: number) {
  return await db.session.findFirst({
    orderBy: {
      id: "desc",
    },
    take: 1,
    where: {
      userId,
      logoutAt: null,
    },
  });
}

async function invalidatingSessionById(id: number) {
  return await db.session.update({
    where: {
      id,
    },
    data: {
      logoutAt: new Date(),
    },
  });
}

async function createSession(sessionData:SessionData) {
    return await db.session.create({data:sessionData});
  }

const sessionRepository = {
  findLastSession,
  invalidatingSessionById,
  createSession,
  findByTokenAndId
};
export default sessionRepository;
