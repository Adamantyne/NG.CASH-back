import { Router } from "express";

import tokenValidator from "../middlewares/globalMiddlewares/tokenMiddleware.js";
import { getTransactions, postTransaction } from "../controllers/transactionsController.js";
import { postTransactionMiddleware } from "../middlewares/transactionsMiddleware.js";
import schemaValidator from "../middlewares/globalMiddlewares/schemaMiddleware.js";
import { transactionSchema } from "../schemas/transactionsSchema.js";

const transactionsRouter = Router();

transactionsRouter.get("/transactions", tokenValidator, getTransactions);

transactionsRouter.post(
  "/transactions",
  schemaValidator(transactionSchema),
  tokenValidator,
  postTransactionMiddleware,
  postTransaction
);

export default transactionsRouter;
