import { Router } from "express";
import {
  createClientController,
  deleteClientController,
  listClientController,
  listOneClientController,
  updateClientController,
} from "../controllers/client.controller";

import { schemaValidation } from "../middlewares/schemaValidation.middleware";

import { verifyAuthToken } from "../middlewares/verifyAuthToken.middleware";
import { clientSchema } from "../schemas/client.schema";

const routes = Router();

export const clientRoutes = () => {
  routes.post(
    "/",
    verifyAuthToken,
    schemaValidation(clientSchema),
    createClientController
  );
  routes.get("/", verifyAuthToken, listClientController);
  routes.get("/:client_id", verifyAuthToken, listOneClientController);
  routes.patch("/:client_id", verifyAuthToken, updateClientController);
  routes.delete("/:client_id", verifyAuthToken, deleteClientController);

  return routes;
};
