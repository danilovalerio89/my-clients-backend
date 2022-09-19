import { compare } from "bcryptjs";
import { prisma } from "../app";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { IUserLogin } from "../interfaces/user";

export const userLoginService = async (data: IUserLogin) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { email: data.email },
  });

  if (!user) {
    throw new AppError("Wrong email/password");
  }

  const passwordMatch = compare(data.password, user.password);

  if (!passwordMatch) {
    throw new AppError("Wrong email/password");
  }

  //   const token = jwt.sign({})
};
