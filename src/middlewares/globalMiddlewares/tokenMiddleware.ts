import { NextFunction, Request, Response } from "express";

import {
  throwErr,
  validateToken,
  validateUser,
  validateSession,
} from "../../utils/suportFunctions.js";

export default async function tokenValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer", "")?.trim();
  if (!token) {
    throwErr("unauthorized", "You must be logged in to do this.");
  }
  const jwtData = validateToken(token);
  const userData = await validateUser(jwtData.username);
  const sessionData = { token, userId: jwtData.id };
  await validateSession(sessionData);
  res.locals.userId = {userId:userData.id};
  next();
}
