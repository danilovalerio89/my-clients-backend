import { prisma } from "../app";
import { AppError } from "../errors/AppError";
import {
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

export const listClientService = async (user: IUserData) => {
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

export const listOneClientService = async (client_id: string) => {
  const clients = await prisma.client.findUnique({
    where: {
      id: client_id,
    },
    include: {
      contacts: true,
    },
  });

  return clients;
};

export const updateClientService = async (
  client_id: string,
  data: IClientUpdate,
  user: IUserData
) => {
  const client = await prisma.client.findUnique({
    where: {
      id: client_id,
    },
  });

  const clientUpdated = await prisma.client.update({
    where: {
      id: client_id,
    },
    data: {
      name: data.name ? data.name : client?.name,
      email: data.email ? data.email : client?.email,
      phone: data.phone ? data.phone : client?.phone,
    },
  });

  return clientUpdated;
};

export const deleteClientService = async (client_id: string) => {
  const userDeleted = await prisma.client.delete({
    where: {
      id: client_id,
    },
  });
  return;
};
