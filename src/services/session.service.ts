import { compare } from "bcryptjs";
import { prisma } from "../../prisma";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { IUserLogin } from "../interfaces/user";

export const userLoginService = async (data: IUserLogin) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (!user) {
    throw new AppError("Wrong email/password");
  }

  const passwordMatch = await compare(data.password, user.password);

  if (!passwordMatch) {
    throw new AppError("Wrong email/password");
  }

  const token = jwt.sign(
    {
      id: user!.id,
      email: user!.email,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
    }
  );

  return token;
};
