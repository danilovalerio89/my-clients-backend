import { prisma } from "../app";

import { IContactClient } from "../interfaces/contacts";

import { IUserData } from "../interfaces/user";

export const createContactsService = async (
  client_id: string,
  data: IContactClient,
  user: IUserData
) => {
  console.log(client_id);
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

export const listContactsClientService = async (client_id: string) => {
  const contacts = await prisma.contacts.findMany({
    where: {
      clientId: client_id,
    },
  });

  return contacts;
};

///////////////////////

export const listOneContactClientService = async (contact_id: string) => {
  const contacts = await prisma.contacts.findFirst({
    where: {
      id: contact_id,
    },
  });

  return contacts;
};
