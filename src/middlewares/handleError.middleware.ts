import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

const handleError = (
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction
) => {
  if (error instanceof AppError) {
    response.status(error.statusCode).json({ message: error.message });
  }

  return response.status(500).json({ message: "Internal server error" });
};

export default handleError;
