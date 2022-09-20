import { prisma } from "../app";
import { AppError } from "../errors/AppError";
import {
  IUserCreate,
  IUserData,
  IUserList,
  IUserResponse,
  IUserUpdate,
} from "../interfaces/user";
import { hash } from "bcryptjs";

export const createUserService = async (
  data: IUserCreate
): Promise<IUserResponse> => {
  const verifyUserEmail = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (verifyUserEmail) {
    throw new AppError("Email already exists");
  }

  const hashedPassword = await hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
    include: {
      clients: true,
    },
  });

  const { password, ...response } = user;

  return response;
};

export const listUsersService = async (): Promise<IUserList[]> => {
  const users = await prisma.user.findMany();

  const response: IUserList[] = [];

  users.forEach((user) => {
    const { password, ...userResponse } = user;

    response.push(userResponse);
  });

  return response;
};

export const listUserByIdService = async (
  user_id: string
): Promise<IUserResponse> => {
  const user = await prisma.user.findUnique({
    where: { id: user_id },
    include: { clients: true },
  });

  if (!user) {
    throw new AppError("User dont exists");
  }

  const { password, ...response } = user;

  return response;
};

export const updateUserService = async (
  user_id: string,
  user: IUserData,
  userUpdate: IUserUpdate
): Promise<IUserList> => {
  if (user_id != user.id) {
    throw new AppError("You don't have permission", 403);
  }

  if (userUpdate.email) {
    const verifyUserEmail = await prisma.user.findUnique({
      where: { email: userUpdate.email },
    });
    if (verifyUserEmail) {
      throw new AppError("Email already exists");
    }
  }

  const findUser = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  });

  const updateUser = await prisma.user.update({
    where: {
      id: user_id,
    },
    data: {
      name: userUpdate.name ? userUpdate.name : findUser?.name,
      email: userUpdate.email ? userUpdate.email : findUser?.email,
      password: userUpdate.password
        ? await hash(userUpdate.password, 10)
        : findUser?.password,
    },
  });

  const { password, ...response } = updateUser;

  return response;
};

export const deleteUserService = async (
  user_id: string,
  user: IUserData
): Promise<void> => {
  const findUser = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
  });

  if (!findUser) {
    throw new AppError("User not found", 400);
  }

  if (user_id != user.id) {
    throw new AppError("You don't have permission", 403);
  }

  const deleteUser = await prisma.user.delete({
    where: {
      id: user_id,
    },
  });

  return;
};
