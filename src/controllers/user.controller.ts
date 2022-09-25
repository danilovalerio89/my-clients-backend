import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import {
  createUserService,
  deleteUserService,
  listProfileService,
  listUsersService,
  updateUserService,
} from "../services/user.service";

export const createUserController = async (
  request: Request,
  response: Response
) => {
  const data = request.body;

  const user = await createUserService(data);
  return response.status(201).json(instanceToPlain(user));
};

export const listUsersController = async (
  request: Request,
  response: Response
) => {
  const users = await listUsersService();

  return response.status(200).json(instanceToPlain(users));
};

export const listProfileController = async (
  request: Request,
  response: Response
) => {
  const user = await listProfileService(request.user);

  return response.status(200).json(instanceToPlain(user));
};

export const updateUserController = async (
  request: Request,
  response: Response
) => {
  const { user_id } = request.params;

  const user = await updateUserService(user_id, request.user, request.body);

  return response.status(200).json(instanceToPlain(user));
};

export const deleteUserController = async (
  request: Request,
  response: Response
) => {
  const { user_id } = request.params;

  await deleteUserService(user_id, request.user);

  return response.status(204).json({ message: "User deleted." });
};
