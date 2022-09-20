import { Request, Response } from "express";
import {
  createContactsService,
  listContactsClientService,
  listOneContactClientService,
} from "../services/contacts.service";

export const createContactController = async (
  request: Request,
  response: Response
) => {
  const { client_id } = request.params;

  const client = await createContactsService(
    client_id,
    request.body,
    request.user
  );

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

/////////////////////////////////////////////////////////////////
export const listOneContactClientController = async (
  request: Request,
  response: Response
) => {
  const { contact_id } = request.params;

  const contact = await listOneContactClientService(contact_id);

  return response.status(200).json(contact);
};
