import { prisma } from "../app";
import { AppError } from "../errors/AppError";
import { IContactResponse, IContactUpdate } from "../interfaces/contacts";
import { IContactClient } from "../interfaces/contacts";

export const createContactsService = async (
  client_id: string,
  data: IContactClient
): Promise<IContactResponse> => {
  const client = await prisma.client.findUnique({
    where: {
      id: client_id,
    },
  });

  if (!client) {
    throw new AppError("Client not exists.");
  }

  const contact = await prisma.contacts.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      client: {
        connect: {
          id: client_id,
        },
      },
    },
  });

  return contact;
};

export const listContactsClientService = async (
  client_id: string
): Promise<IContactResponse[]> => {
  const client = await prisma.client.findUnique({ where: { id: client_id } });

  const contacts = await prisma.contacts.findMany({
    where: {
      clientId: client_id,
    },
  });

  if (!client) {
    throw new AppError("Client not exists.");
  }

  return contacts;
};

export const listOneContactClientService = async (
  client_id: string,
  contact_id: string
): Promise<IContactResponse> => {
  const client = await prisma.client.findUnique({ where: { id: client_id } });

  if (!client) {
    throw new AppError("Client not exists.");
  }

  const contact = await prisma.contacts.findUnique({
    where: {
      id: contact_id,
    },
  });

  if (!contact) {
    throw new AppError("Contact not exists.");
  }

  return contact;
};

export const updateContactClientService = async (
  client_id: string,
  contact_id: string,
  data: IContactUpdate
): Promise<IContactResponse> => {
  const client = await prisma.client.findUnique({ where: { id: client_id } });

  if (!client) {
    throw new AppError("Client not exists.");
  }

  const contact = await prisma.contacts.findUnique({
    where: {
      id: contact_id,
    },
  });

  if (!contact) {
    throw new AppError("Contact not exists.");
  }

  const updatedContact = await prisma.contacts.update({
    where: {
      id: contact_id,
    },
    data: data,
  });

  return updatedContact;
};

export const deleteContactClientService = async (
  client_id: string,
  contact_id: string
): Promise<void> => {
  const client = await prisma.client.findUnique({ where: { id: client_id } });

  if (!client) {
    throw new AppError("Client not exists.");
  }

  const contact = await prisma.contacts.findUnique({
    where: {
      id: contact_id,
    },
  });

  if (!contact) {
    throw new AppError("Contact not exists.");
  }

  await prisma.contacts.delete({
    where: {
      id: contact_id,
    },
  });

  return;
};
