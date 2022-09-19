import { Router } from "express";
import {
  createUserController,
  listUserByIdController,
  listUsersController,
} from "../controllers/user.controller";

const routes = Router();

export const userRoutes = () => {
  routes.post("/", createUserController);
  routes.get("/", listUsersController);
  routes.get("/:user_id", listUserByIdController);

  return routes;
};
