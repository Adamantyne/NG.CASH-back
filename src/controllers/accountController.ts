import { Request, Response } from "express";

import accountService from "../services/accountService.js";

export async function getBalance(req:Request,res:Response) {
    const {userId}:{userId:number} = res.locals.userId;
    const balance = await accountService.getBalance(userId);
    res.status(200).send(balance);
}