import { Request, Response, NextFunction } from "express";
import { Schema, ValidationError } from "joi";

function validate(schema: Schema) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.validateAsync(
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

      next();
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        res.status(400).json({
          error: error.details.map((err) => err.message).join(", "),
        });
        return;
      }

      next(error);
    }
  };
}

export default validate;
