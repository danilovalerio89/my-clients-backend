import express from "express";
import "express-async-errors";
import cors from "cors";
import handleError from "./middlewares/handleError.middleware";
import { appRoutes } from "./routes";

const app = express();

app.use(cors());

app.use(express.json());

appRoutes(app);

app.use(handleError);

export default app;
