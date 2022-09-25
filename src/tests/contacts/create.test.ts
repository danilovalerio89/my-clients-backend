import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import app from "../../app";
import request from "supertest";
import { userData, userLogin } from "../user/user.mock";
import { contactData } from "./contact.mock";

describe("Testing POST method in /contacts", () => {
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

  test("Trying to create a contact ", async () => {
    const response = await request(app).post("/user/").send(userData);
    const logIn = await request(app).post("/login").send(userLogin);

    const { token } = logIn.body;
    const user = await request(app)
      .get("/user/profile")
      .set("Authorization", `Token ${token}`);

    const { id } = user.body[0];

    const contact = await request(app)
      .post("/contacts")
      .send(contactData)
      .set("Authorization", `Token ${token}`);

    expect(contact.status).toEqual(201);
    expect(contact.body.user.id).toEqual(id);
    expect(contact.body).toEqual(
      expect.objectContaining({
        id: contact.body.id,
        firstName: contact.body.firstName,
        lastName: contact.body.lastName,
        phone: contact.body.phone,
        createdAt: contact.body.createdAt,
        updatedAt: contact.body.updatedAt,
      })
    );
  });
  test("Trying to create a contact without credentials", async () => {
    const logIn = await request(app).post("/login").send(userLogin);

    const { token } = logIn.body;
    const user = await request(app)
      .get("/user/profile")
      .set("Authorization", `Token ${token}`);

    const { id } = user.body[0];

    const contact = await request(app).post("/contacts").send(contactData);

    expect(contact.status).toEqual(401);
    expect(contact.body).toHaveProperty("message", "Missing Authentication");
  });
});
