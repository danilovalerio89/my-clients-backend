import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import app from "../../app";
import request from "supertest";
import { userData } from "./user.mock";

describe("Testing POST method in /user", () => {
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

  test("Trying to create an user ", async () => {
    const response = await request(app).post("/user/").send(userData);

    expect(response.status).toEqual(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: response.body.id,
        name: response.body.name,
        createdAt: response.body.createdAt,
        updatedAt: response.body.updatedAt,
      })
    );
    expect(response.body).not.toHaveProperty("password");
  });

  test("Trying to create an user with same email", async () => {
    const response = await request(app).post("/user/").send(userData);

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("message");
  });
});
