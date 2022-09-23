import { Router } from "express";
import { userLoginController } from "../controllers/session.controller";

const routes = Router();

export const loginRoutes = () => {
  routes.post("/", userLoginController);
  return routes;
};
