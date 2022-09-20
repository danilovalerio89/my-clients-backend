import { Request, Response } from "express";
import {
  createClientService,
  deleteClientService,
  listClientService,
  listOneClientService,
  updateClientService,
} from "../services/client.service";

export const createClientController = async (
  request: Request,
  response: Response
) => {
  const client = await createClientService(request.body, request.user);

  return response.status(200).json(client);
};

export const listClientController = async (
  request: Request,
  response: Response
) => {
  const client = await listClientService(request.user);

  return response.status(200).json(client);
};

export const listOneClientController = async (
  request: Request,
  response: Response
) => {
  const { client_id } = request.params;

  const client = await listOneClientService(client_id);

  return response.status(200).json(client);
};

export const updateClientController = async (
  request: Request,
  response: Response
) => {
  const { client_id } = request.params;

  const client = await updateClientService(client_id, request.body);

  return response.status(200).json(client);
};

export const deleteClientController = async (
  request: Request,
  response: Response
) => {
  const { client_id } = request.params;

  await deleteClientService(client_id);

  return response.status(204).json({ message: "User deleted." });
};
