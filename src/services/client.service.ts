import { prisma } from "../../prisma";
import { AppError } from "../errors/AppError";
import {
  IClientContactsResponse,
  IClientCreate,
  IClientResponse,
  IClientUpdate,
} from "../interfaces/clients";

import { IUserData } from "../interfaces/user";

export const createClientService = async (
  data: IClientCreate,
  user: IUserData
): Promise<IClientResponse> => {
  const client = await prisma.client.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,

      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  return client;
};

export const listClientService = async (
  user: IUserData
): Promise<IClientContactsResponse[]> => {
  const clients = await prisma.client.findMany({
    where: {
      userId: user.id,
    },
    include: {
      contacts: true,
    },
  });

  return clients;
};

export const listOneClientService = async (
  client_id: string
): Promise<IClientContactsResponse> => {
  const client = await prisma.client.findUnique({
    where: {
      id: client_id,
    },
    include: {
      contacts: true,
    },
  });
  if (!client) {
    throw new AppError("Client not exists");
  }

  return client;
};

export const updateClientService = async (
  client_id: string,
  data: IClientUpdate
): Promise<IClientResponse> => {
  const client = await prisma.client.findUnique({
    where: {
      id: client_id,
    },
  });

  if (!client) {
    throw new AppError("Client not exists");
  }

  const clientUpdated = await prisma.client.update({
    where: {
      id: client_id,
    },
    data: data,
  });

  return clientUpdated;
};

export const deleteClientService = async (client_id: string): Promise<void> => {
  const client = await prisma.client.findUnique({
    where: {
      id: client_id,
    },
  });

  if (!client) {
    throw new AppError("Client not exists");
  }

  const userDeleted = await prisma.client.delete({
    where: {
      id: client_id,
    },
  });
  return;
};
