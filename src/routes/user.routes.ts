import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listProfileController,
  listUsersController,
  updateUserController,
} from "../controllers/user.controller";
import { schemaValidation } from "../middlewares/schemaValidation.middleware";
import { verifyAuthToken } from "../middlewares/verifyAuthToken.middleware";
import { userSchema } from "../schemas/user.schema";

const routes = Router();

export const userRoutes = () => {
  routes.post("/", schemaValidation(userSchema), createUserController);
  routes.get("/", listUsersController);
  routes.get("/profile", verifyAuthToken, listProfileController);
  routes.patch("/:user_id", verifyAuthToken, updateUserController);
  routes.delete("/:user_id", verifyAuthToken, deleteUserController);

  return routes;
};
