import { Router } from "express";

import authRouter from "./authRouter.js";
import accountRouter from "./accountRouter.js";
import transactionsRouter from "./transactionsRouter.js";

const routers = Router();

routers.use(authRouter);
routers.use(accountRouter);
routers.use(transactionsRouter);

export default routers;