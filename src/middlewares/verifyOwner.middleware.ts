import { Request, Response, NextFunction } from "express";
import { prisma } from "../../prisma";
import { AppError } from "../errors/AppError";

export const verifyClientOwner = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { client_id } = request.params;

  const client = await prisma.client.findUnique({
    where: {
      id: client_id,
    },
  });

  if (!client) {
    throw new AppError("Client not exists.");
  }

  if (client.userId != request.user.id) {
    throw new AppError("You don't have permission.");
  }

  next();
};
