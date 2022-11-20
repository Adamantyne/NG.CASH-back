import Joi from "joi";
import { Account } from "@prisma/client";

export type AccountType = Omit<Account, "id">;
