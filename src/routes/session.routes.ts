import { Router } from "express";

const routes = Router();

export const userRoutes = () => {
  routes.post("/");
  return routes;
};
