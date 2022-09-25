import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import {
  createContactService,
  deleteContactService,
  listContactService,
  listOneContactService,
  updateContactService,
} from "../services/contact.service";

export const createContactController = async (
  request: Request,
  response: Response
) => {
  const client = await createContactService(request.body, request.user);

  return response.status(201).json(instanceToPlain(client));
};

export const listContactController = async (
  request: Request,
  response: Response
) => {
  const client = await listContactService(request.user);

  return response.status(200).json(client);
};

export const listOneContactController = async (
  request: Request,
  response: Response
) => {
  const { contact_id } = request.params;

  const client = await listOneContactService(contact_id);

  return response.status(200).json(client);
};

export const updateContactController = async (
  request: Request,
  response: Response
) => {
  const { contact_id } = request.params;

  const client = await updateContactService(contact_id, request.body);

  return response.status(200).json(client);
};

export const deleteContactController = async (
  request: Request,
  response: Response
) => {
  const { contact_id } = request.params;

  await deleteContactService(contact_id);

  return response.status(204).json({ message: "User deleted." });
};
