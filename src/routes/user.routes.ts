import { Router } from "express";
import {
  createUserController,
  listUsersController,
} from "../controllers/user.controller";

const routes = Router();

export const userRoutes = () => {
  routes.post("/", createUserController);
  routes.get("/", listUsersController);

  return routes;
};
