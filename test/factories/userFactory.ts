import { signUp } from "../testRepositories/authTestRepository";
import { validSignUpData } from "./authFactory";

export async function buildingValidUser() {
    const signUpData = await validSignUpData();
    await signUp(signUpData);
    return signUpData;
}