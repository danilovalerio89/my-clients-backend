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
import { verifyClientOwner } from "../middlewares/verifyOwner.middleware";
import { contactSchema } from "../schemas/contacts.schema";

const routes = Router();

export const contactsRoutes = () => {
  routes.post(
    "/:client_id/contacts",
    verifyAuthToken,
    schemaValidation(contactSchema),
    verifyClientOwner,
    createContactController
  );
  routes.get(
    "/:client_id/contacts",
    verifyAuthToken,
    verifyClientOwner,
    listContactsClientController
  );

  routes.get(
    "/:client_id/contacts/:contact_id",
    verifyAuthToken,
    verifyClientOwner,
    listOneContactClientController
  );

  routes.patch(
    "/:client_id/contacts/:contact_id",
    verifyAuthToken,
    verifyClientOwner,
    updateClientContactController
  );

  routes.delete(
    "/:client_id/contacts/:contact_id",
    verifyAuthToken,
    verifyClientOwner,
    deleteClientContactController
  );

  return routes;
};
