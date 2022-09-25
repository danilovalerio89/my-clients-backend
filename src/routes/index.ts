import { Express } from "express";
import { contactRoutes } from "./contact.routes";
import { loginRoutes } from "./session.routes";
import { userRoutes } from "./user.routes";

export const appRoutes = (app: Express) => {
  app.use("/user", userRoutes());
  app.use("/login", loginRoutes());
  app.use("/contacts", contactRoutes());
};
