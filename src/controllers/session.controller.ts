import { Request, Response } from "express";
import { userLoginService } from "../services/session.service";

export const userLoginController = async (
  request: Request,
  response: Response
) => {
  const userLogin = await userLoginService(request.body);

  return response.status(200).json({ token: userLogin });
};
