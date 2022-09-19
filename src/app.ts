import express from "express";

const app = express();

app.use(express.json());

const PORT: number = 3000;

const MSG_RETURN: string = `Server running on port: ${PORT}`;

app.listen(PORT, () => {
  console.log(MSG_RETURN);
});
