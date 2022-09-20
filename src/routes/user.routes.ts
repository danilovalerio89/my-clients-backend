import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listUserByIdController,
  listUsersController,
  updateUserController,
} from "../controllers/user.controller";
import { verifyAuthToken } from "../middlewares/verifyAuthToken.middleware";

const routes = Router();

export const userRoutes = () => {
  routes.post("/", createUserController);
  routes.get("/", listUsersController);
  routes.get("/:user_id", listUserByIdController);
  routes.patch("/:user_id", verifyAuthToken, updateUserController);
  routes.delete("/:user_id", verifyAuthToken, deleteUserController);

  return routes;
};
