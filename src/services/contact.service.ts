import { AppDataSource } from "../data-source";
import { Contacts } from "../entities/contacts.entity";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/AppError";
import { IContactCreate, IContactUpdate } from "../interfaces/contacts";

import { IUserData } from "../interfaces/user";

export const createContactService = async (
  data: IContactCreate,
  user: IUserData
) => {
  const contactsRepository = AppDataSource.getRepository(Contacts);
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({ id: user.id });

  if (!findUser) {
    throw new AppError("User not found");
  }

  const contact = new Contacts();
  contact.firstName = data.firstName;
  contact.lastName = data.lastName;
  contact.email = data.email;
  contact.phone = data.phone;
  contact.user = findUser;

  await contactsRepository.save(contact);

  return contact;
};

export const listContactService = async (user: IUserData) => {
  const contactsRepository = AppDataSource.getRepository(Contacts);

  const contacts = await contactsRepository.find({ where: { user: user } });

  return contacts;
};

export const listOneContactService = async (contact_id: string) => {
  const contactsRepository = AppDataSource.getRepository(Contacts);
  const contact = await contactsRepository.find({ where: { id: contact_id } });

  return contact;
};

export const updateContactService = async (
  contact_id: string,
  data: IContactUpdate
) => {
  const contactsRepository = AppDataSource.getRepository(Contacts);
  const contact = await contactsRepository.findOneBy({ id: contact_id });

  if (contact) {
    const patchContact = await contactsRepository.update(contact.id, {
      firstName: data.firstName ? data.firstName : contact.firstName,
      lastName: data.lastName ? data.lastName : contact.lastName,
      email: data.email ? data.email : contact.email,
      phone: data.phone ? data.phone : contact.phone,
    });
  }
  const returnContact = await contactsRepository.findOneBy({ id: contact_id });

  return returnContact;
};

export const deleteContactService = async (
  contact_id: string
): Promise<void> => {
  const contactsRepository = AppDataSource.getRepository(Contacts);
  const contact = await contactsRepository.find({ where: { id: contact_id } });

  if (!contact) {
    throw new AppError("Contact not exists");
  }

  await contactsRepository.delete({ id: contact_id });

  return;
};
