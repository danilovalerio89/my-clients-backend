import { NextFunction, Request, Response } from "express";
import {
  createUserService,
  deleteUserService,
  listUserByIdService,
  listUsersService,
  updateUserService,
} from "../services/user.service";

export const createUserController = async (
  request: Request,
  response: Response
  // next: NextFunction
) => {
  const data = request.body;
  console.log(data);
  const user = await createUserService(data);
  return response.status(201).json(user);
};

export const listUsersController = async (
  request: Request,
  response: Response
  // next: NextFunction
) => {
  const users = await listUsersService();

  return response.status(200).json(users);
};

export const listUserByIdController = async (
  request: Request,
  response: Response
  // next: NextFunction
) => {
  const { user_id } = request.params;

  const user = await listUserByIdService(user_id);

  return response.status(200).json(user);
};

export const updateUserController = async (
  request: Request,
  response: Response
) => {
  const { user_id } = request.params;

  const user = await updateUserService(user_id, request.user, request.body);

  return response.status(200).json(user);
};

export const deleteUserController = async (
  request: Request,
  response: Response
) => {
  const { user_id } = request.params;

  await deleteUserService(user_id, request.user);

  return response.status(204).json({ message: "User deleted." });
};
