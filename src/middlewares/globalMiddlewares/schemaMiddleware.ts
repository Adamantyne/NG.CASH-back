import { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";

export default function schemaValidator(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const {error} = schema.validate(req.body, { abortEarly: false });
    if (error) {
      let message = "";
      error.details.forEach((detail) => message+=`${detail.message}/ `);
      return res.status(422).send(message);
    }

    next();
  };
}
