import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../errors/AppError";

export const verifyAuthToken = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers.authorization;

  if (!token) {
    throw new AppError("Missing Authentication", 401);
  }

  const tokenSplit = token.split(" ")[1];

  jwt.verify(
    tokenSplit,
    process.env.SECRET_KEY as string,
    (error: any, decoded: any) => {
      if (error) {
        throw new AppError("Missing Authentication", 401);
      }
      request.user = {
        id: decoded.id,
        email: decoded.email,
      };
    }
  );

  next();
};
