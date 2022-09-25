import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import app from "../../app";
import request from "supertest";
import { userData, userLogin } from "./user.mock";

describe("Testing PATCH method in /user", () => {
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

  test("Trying to update an user ", async () => {
    const response = await request(app).post("/user/").send(userData);
    const logIn = await request(app).post("/login").send(userLogin);

    const { token } = logIn.body;
    const user = await request(app)
      .get("/user/profile")
      .set("Authorization", `Token ${token}`);

    const { id } = user.body[0];

    const responsePatch = await request(app)
      .patch(`/user/${id}`)
      .send({ name: "Test PATCH" })
      .set("Authorization", `Token ${token}`);

    expect(responsePatch.status).toEqual(200);
    expect(responsePatch.body.name).toEqual("Test PATCH");
  });

  test("Trying to log in an user with no credentials", async () => {
    const getUser = await request(app).get("/user");

    const response = await request(app)
      .patch(`/user/${getUser.body[0].id}`)
      .send({ name: "Test PATCH no Credentials" });

    expect(response.status).toEqual(401);
    expect(response.body).toHaveProperty("message", "Missing Authentication");
  });
});
