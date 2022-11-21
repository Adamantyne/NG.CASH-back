import { NextFunction, Request, Response } from "express";
import { User } from "@prisma/client";

import { SignInInput, SignUpInput } from "../schemas/authSchemas.js";
import {
  throwErr,
  validateUser,
  validatePassword,
} from "../utils/suportFunctions.js";
import userRepository from "../repositories/userRepository.js";
import { lowerMask, leastOneNumberMask } from "../utils/regexMasks.js";

export async function signUpMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, password }: SignUpInput = req.body;
  const alreadyExist = await userRepository.findByUsername(username);
  if (alreadyExist) {
    throwErr("conflict", "username already registered");
  }
  passwordValidate(password);

  next();
}

export async function signInMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const inputData: SignInInput = req.body;

  const user: User = await validateUser(inputData.username);

  await validatePassword(inputData.password, user.password);

  res.locals.userData = user;
  next();
}

function passwordValidate(password:string){
  if(lowerMask.test(password)){
    throwErr("conflict", "password must have at least one capital letter");
  }else if(!leastOneNumberMask.test(password)){
    throwErr("conflict", "password must have at least one number");
  }
}