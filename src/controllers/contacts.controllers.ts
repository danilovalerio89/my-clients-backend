import { Request, Response } from "express";
import {
  createContactsService,
  deleteContactClientService,
  listContactsClientService,
  listOneContactClientService,
  updateContactClientService,
} from "../services/contacts.service";

export const createContactController = async (
  request: Request,
  response: Response
) => {
  const { client_id } = request.params;

  const client = await createContactsService(client_id, request.body);

  return response.status(200).json(client);
};

export const listContactsClientController = async (
  request: Request,
  response: Response
) => {
  const { client_id } = request.params;

  const contactsClient = await listContactsClientService(client_id);

  return response.status(200).json(contactsClient);
};

export const listOneContactClientController = async (
  request: Request,
  response: Response
) => {
  const { client_id, contact_id } = request.params;

  const contact = await listOneContactClientService(client_id, contact_id);

  return response.status(200).json(contact);
};

export const updateClientContactController = async (
  request: Request,
  response: Response
) => {
  const { client_id, contact_id } = request.params;

  const contact = await updateContactClientService(
    client_id,
    contact_id,
    request.body
  );

  return response.status(200).json(contact);
};

export const deleteClientContactController = async (
  request: Request,
  response: Response
) => {
  const { client_id, contact_id } = request.params;

  const contact = await deleteContactClientService(client_id, contact_id);

  return response.status(204).json({ message: "Contact deleted." });
};
