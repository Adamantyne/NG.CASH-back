import { Router } from "express";

import schemaValidator from "../middlewares/globalMiddlewares/schemaMiddleware.js";
import { signUpSchema, signInSchema } from "../schemas/authSchemas.js";
import {
  signUpMiddleware,
  signInMiddleware,
} from "../middlewares/authMiddleware.js";
import {
  signIn,
  signUp,
  signOut,
  checkToken,
} from "../controllers/authController.js";
import tokenValidator from "../middlewares/globalMiddlewares/tokenMiddleware.js";

const authRouter = Router();

authRouter.post(
  "/sign-up",
  schemaValidator(signUpSchema),
  signUpMiddleware,
  signUp
);
authRouter.post(
  "/sign-in",
  schemaValidator(signInSchema),
  signInMiddleware,
  signIn
);
authRouter.post("/sign-out", tokenValidator, signOut);
authRouter.get("/token", tokenValidator, checkToken);

export default authRouter;
