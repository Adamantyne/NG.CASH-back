import Joi from "joi";
import { User,Session } from "@prisma/client";

export interface SignUpData extends Omit<User,"id" >{
  confirmPassword: string;
}
export type SignUpInput = Omit<SignUpData, "accountId">;
export type SignInData = Omit<SignUpData, "confirmPassword">;
export type SignInInput = Omit<SignUpInput, "confirmPassword">;
export type SessionData = Omit<Session, "id"|"loginAt"|"logoutAt">;

export const signUpSchema = Joi.object<SignUpInput>({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

export const signInSchema = Joi.object<SignInInput>({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(8).required(),
});
