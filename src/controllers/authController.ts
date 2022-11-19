import { User } from "@prisma/client";
import { Request, Response } from "express";

import { SignUpData } from "../schemas/authSchemas.js";
import authServices from "../services/authServices.js";

export async function signIn(req:Request,res:Response) {
    const userData:User = res.locals.userData;
    const token = await authServices.createSession(userData);
    const userInfos = await authServices.getUserInfos(userData.username);
    res.status(201).send({token, userData: userInfos});
}

export async function signUp(req:Request,res:Response) {
    const inputData:SignUpData = req.body;
    await authServices.createUser(inputData);
    res.sendStatus(201);
}

export async function signOut(req:Request,res:Response) {
    const {userId}:{userId:number} = res.locals.userId;
    await authServices.invalidatingLastSession(userId);
    res.sendStatus(201);
}

export async function checkToken(req:Request,res:Response) {
    res.sendStatus(200);
}