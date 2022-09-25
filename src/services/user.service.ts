import { AppError } from "../errors/AppError";
import {
  IUserCreate,
  IUserData,
  IUserList,
  IUserResponse,
  IUserUpdate,
} from "../interfaces/user";
import { hash } from "bcryptjs";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";

export const createUserService = async (
  data: IUserCreate
): Promise<IUserResponse> => {
  const userRepository = AppDataSource.getRepository(User);

  const verifyUserEmail = await userRepository.findOneBy({
    email: data.email,
  });

  if (verifyUserEmail) {
    throw new AppError("Email already exists");
  }

  const hashedPassword = await hash(data.password, 10);
  const user = userRepository.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  });

  await userRepository.save(user);

  return user;
};

export const listUsersService = async (): Promise<IUserList[]> => {
  const usersRepository = AppDataSource.getRepository(User);

  const users = await usersRepository.find();

  return users;
};

export const listProfileService = async (user: IUserData) => {
  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.find({
    relations: {
      contacts: true,
    },
    where: {
      id: user.id,
    },
  });

  return findUser;
};

export const updateUserService = async (
  user_id: string,
  user: IUserData,
  userUpdate: IUserUpdate
) => {
  if (user_id != user.id) {
    throw new AppError("You don't have permission", 403);
  }

  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({ id: user.id });

  if (userUpdate.email) {
    const verifyEmail = await userRepository.findOneBy({
      email: userUpdate.email,
    });
    if (verifyEmail) {
      if (findUser?.id !== verifyEmail?.id) {
        throw new AppError("Email already exists.");
      }
    }
  }

  if (findUser?.id) {
    const userUpdated = await userRepository.update(findUser?.id, {
      name: userUpdate.name ? userUpdate.name : findUser.name,
      email: userUpdate.email ? userUpdate.email : findUser.email,
      password: userUpdate.password
        ? await hash(userUpdate.password, 10)
        : findUser.password,
    });
  }
  const userReturn = await userRepository.findOneBy({ id: user.id });

  return userReturn;
};

export const deleteUserService = async (
  user_id: string,
  user: IUserData
): Promise<void> => {
  if (user_id != user.id) {
    throw new AppError("You don't have permission", 403);
  }

  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({ id: user.id });

  if (!findUser) {
    throw new AppError("User not found", 400);
  }

  await userRepository.delete({ id: user_id });

  return;
};
