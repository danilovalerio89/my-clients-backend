import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import app from "../../app";
import request from "supertest";
import { userData, userLogin } from "./user.mock";

describe("Testing DELETE method in /user", () => {
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

  test("Trying to delete an user ", async () => {
    const response = await request(app).post("/user/").send(userData);
    const logIn = await request(app).post("/login").send(userLogin);

    const { token } = logIn.body;
    const user = await request(app)
      .get("/user/profile")
      .set("Authorization", `Token ${token}`);

    const { id } = user.body[0];

    const responseDelete = await request(app)
      .delete(`/user/${id}`)
      .set("Authorization", `Token ${token}`);

    expect(responseDelete.status).toEqual(204);
  });

  test("Trying to delete an user with no credentials", async () => {
    const response = await request(app).post("/user/").send(userData);
    const logIn = await request(app).post("/login").send(userLogin);

    const { token } = logIn.body;
    const user = await request(app)
      .get("/user/profile")
      .set("Authorization", `Token ${token}`);

    const { id } = user.body[0];

    const responseDelete = await request(app).delete(`/user/${id}`);

    expect(responseDelete.status).toEqual(401);
    expect(responseDelete.body).toHaveProperty(
      "message",
      "Missing Authentication"
    );
  });
});
