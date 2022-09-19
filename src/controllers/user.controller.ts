import { NextFunction, Request, Response } from "express";
import {
  createUserService,
  listUserByIdService,
  listUsersService,
} from "../services/user.service";

export const createUserController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const data = request.body;
  console.log(data);
  const user = await createUserService(data);
  return response.status(201).json(user);
};

export const listUsersController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const users = await listUsersService();

  return response.status(200).json(users);
};

export const listUserByIdController = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { user_id } = request.params;

  const user = await listUserByIdService(user_id);

  return response.status(200).json(user);
};
