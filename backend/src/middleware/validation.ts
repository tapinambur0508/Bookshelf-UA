import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

function validate(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(
      {
        query: req.query,
        params: req.params,
        body: req.body,
      },
      {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: false,
      },
    );

    if (error !== undefined) {
      res.status(400).json({ error: error.details.map((err) => err.message).join(", ") });
      return;
    }

    req.query = value.query;
    req.params = value.params;
    req.body = value.body;

    next();
  };
}

export default validate;
