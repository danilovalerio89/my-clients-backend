import { prisma } from "../app";
import { AppError } from "../errors/AppError";
import { IUserCreate, IUserList, IUserResponse } from "../interfaces/user";
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
