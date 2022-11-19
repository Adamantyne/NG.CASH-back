import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import dayjs from "dayjs";
//import Cryptr from "cryptr";

import userRepository from "../repositories/userRepository.js";
import { SessionData } from "../schemas/authSchemas.js";
import sessionRepository from "../repositories/sessionRepository.js";

interface JWTData {
  username: string;
  id: number;
}

dotenv.config();
//const cryptr = new Cryptr(process.env.CRYPTER_CODE);

const JWTDataValidate = (input: object | string): input is JWTData => {
  return typeof input === "object" && "username" && "id" in input;
};

export function throwErr(
  type: "conflict" | "not_found" | "unauthorized" | "unprocessable_entity",
  message: string
) {
  throw { type, message };
}

export function createToken(data: { username: string; id: number }) {
  const todayDate = getTodayTime();
  const nextDay = todayDate+86400;

  const tokenData = {...data, iat: todayDate, exp: nextDay }
  const token = jwt.sign(tokenData, process.env.JWT_SECRET);
  return token;
}

export function validateToken(token: string) {
  try {
    const jwtData = jwt.verify(token, process.env.JWT_SECRET);
    if (JWTDataValidate(jwtData) && jwtData.username && jwtData.id) {
      return jwtData;
    } else {
      throwErr("unauthorized", "Invalid Token");
    }
  } catch (error) {
    throwErr("unauthorized", "Invalid Token");
  }
}

export async function validateUser(username: string) {
  const validUser = await userRepository.findByUsername(username);
  if (!validUser) {
    throwErr("unauthorized", "unregistered username");
  }
  return validUser;
}
export async function validatePassword(
  password: string,
  encryptPassword: string
) {
  const validPassword = bcrypt.compareSync(password, encryptPassword);
  if (!validPassword) {
    throwErr("unauthorized", "incorrect password");
  }
}

export async function validateSession(sessionData: SessionData) {
  const validSession = await sessionRepository.findByTokenAndId(sessionData);
  if (!validSession) {
    throwErr("unauthorized", "invalid or expired token");
  }
}

export function isNaNValidate(value:number) {
  if (Number.isNaN(value)) {
    throwErr("unprocessable_entity", "customer id must be a numeric value");
  }
}

export function getTodayDate() {
  return dayjs();
}

export function getTodayTime(){
  return Math.round(Date.now()/1000);
}

export function dateValidate(date:string) {
  if (!dayjs(date).isValid()) {
    throwErr("unprocessable_entity", "date is not valid");
  }
}

// export function decryptString(encryptedString:string){
//   return cryptr.decrypt(encryptedString);
// }

// export function encryptString(string:string){
//   return cryptr.encrypt(string);
// }
