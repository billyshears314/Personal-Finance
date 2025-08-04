import { ZodType } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodType, location: "body" | "query" | "params" = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[location]);

    if (!result.success) {
      // result.error.issues is an array of ZodIssue objects
      // You can transform it to your desired error format
      const errors = result.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
        code: issue.code,
      }));

      return res.status(400).json({
        message: "Validation error",
        errors,
      });
    }

    // Optionally replace the input with the parsed (type-safe) version
    req[location] = result.data;

    next();
  };
