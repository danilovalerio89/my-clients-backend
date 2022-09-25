import { Router } from "express";
import {
  createContactController,
  deleteContactController,
  listContactController,
  listOneContactController,
  updateContactController,
} from "../controllers/contact.controller";

import { verifyAuthToken } from "../middlewares/verifyAuthToken.middleware";
import { verifyContactOwner } from "../middlewares/verifyOwner.middleware";

import { contactSchema } from "../schemas/contacts.schema";
import { schemaValidation } from "../middlewares/schemaValidation.middleware";

const routes = Router();

export const contactRoutes = () => {
  routes.post(
    "/",
    verifyAuthToken,
    schemaValidation(contactSchema),
    createContactController
  );
  routes.get("/", verifyAuthToken, listContactController);
  routes.get(
    "/:contact_id",
    verifyAuthToken,
    verifyContactOwner,
    listOneContactController
  );
  routes.patch(
    "/:contact_id",
    verifyAuthToken,
    verifyContactOwner,
    updateContactController
  );
  routes.delete(
    "/:contact_id",
    verifyAuthToken,
    verifyContactOwner,
    deleteContactController
  );

  return routes;
};
