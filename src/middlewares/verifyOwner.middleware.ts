import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Contacts } from "../entities/contacts.entity";
import { AppError } from "../errors/AppError";

export const verifyContactOwner = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { contact_id } = request.params;
  const contactRepository = AppDataSource.getRepository(Contacts);

  const client = await contactRepository.find({
    relations: {
      user: true,
    },
    where: { id: contact_id },
  });

  if (client.length == 0) {
    throw new AppError("Client not exists.");
  }

  if (client[0].user.id !== request.user.id) {
    throw new AppError("You dont have permission", 403);
  }

  next();
};
