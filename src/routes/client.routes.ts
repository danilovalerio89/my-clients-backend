import { Router } from "express";
import {
  createClientController,
  deleteClientController,
  listClientController,
  listOneClientController,
  updateClientController,
} from "../controllers/client.controller";
import {
  createContactController,
  listContactsClientController,
  listOneContactClientController,
} from "../controllers/contacts.controllers";

import { verifyAuthToken } from "../middlewares/verifyAuthToken.middleware";

const routes = Router();

export const clientRoutes = () => {
  routes.post("/", verifyAuthToken, createClientController);
  routes.get("/", verifyAuthToken, listClientController);
  routes.get("/:client_id", verifyAuthToken, listOneClientController);
  routes.patch("/:client_id", verifyAuthToken, updateClientController);
  routes.delete("/:client_id", verifyAuthToken, deleteClientController);

  ///////////////////////////////

  routes.post("/:client_id/contacts", verifyAuthToken, createContactController);
  routes.get(
    "/:client_id/contacts",
    verifyAuthToken,
    listContactsClientController
  );

  routes.get(
    "/contacts/:contact_id",
    verifyAuthToken,
    listOneContactClientController
  );

  return routes;
};
