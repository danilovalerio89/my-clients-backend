import express from "express";
import "reflect-metadata";
import { appRoutes } from "./routes";
import "express-async-errors";
import handleError from "./middlewares/handleError.middleware";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
appRoutes(app);

app.use(handleError);

export default app;
