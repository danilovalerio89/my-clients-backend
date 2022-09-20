import { Router } from "express";

import {
  createContactController,
  listContactsClientController,
  listOneContactClientController,
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
    "/contacts/:contact_id",
    verifyAuthToken,
    listOneContactClientController
  );

  return routes;
};
