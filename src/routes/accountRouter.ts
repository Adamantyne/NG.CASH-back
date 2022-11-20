import { Router } from "express";

import tokenValidator from "../middlewares/globalMiddlewares/tokenMiddleware.js";
import { getBalance } from "../controllers/accountController.js";

const accountRouter = Router();

accountRouter.get("/balance", tokenValidator, getBalance);

export default accountRouter;
