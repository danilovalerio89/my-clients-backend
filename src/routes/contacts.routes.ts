import { Router } from "express";

import {
  createContactController,
  deleteClientContactController,
  listContactsClientController,
  listOneContactClientController,
  updateClientContactController,
} from "../controllers/contacts.controllers";
import { schemaValidation } from "../middlewares/schemaValidation.middleware";

import { verifyAuthToken } from "../middlewares/verifyAuthToken.middleware";

const routes = Router();

export const contactsRoutes = () => {
  routes.post("/:client_id/contacts", verifyAuthToken, createContactController);
  routes.get(
    "/:client_id/contacts",
    verifyAuthToken,
    listContactsClientController
  );

  routes.get(
    "/:client_id/contacts/:contact_id",
    verifyAuthToken,
    listOneContactClientController
  );

  routes.patch(
    "/:client_id/contacts/:contact_id",
    verifyAuthToken,
    updateClientContactController
  );

  routes.delete(
    "/:client_id/contacts/:contact_id",
    verifyAuthToken,
    deleteClientContactController
  );

  return routes;
};
