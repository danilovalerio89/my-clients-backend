import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import app from "../../app";
import request from "supertest";
import { userData, userLogin } from "./user.mock";

describe("Testing POST method in /login", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("Trying to log in an user ", async () => {
    const response = await request(app).post("/user/").send(userData);

    const logIn = await request(app).post("/login").send(userLogin);

    expect(logIn.status).toEqual(200);
    expect(logIn.body).toHaveProperty("token");
  });

  test("Trying to log in an user with wrong email", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "wrong@email.com", password: "1234" });

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("message", "Wrong email/password");
  });

  test("Trying to log in an user with wrong password", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "email@test.com", password: "123456" });

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("message", "Wrong email/password");
  });
});
