import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import app from "../../app";
import request from "supertest";
import { userData, userLogin } from "../user/user.mock";
import { contactData } from "./contact.mock";

describe("Testing DELETE method in /contacts", () => {
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

  test("Trying to delete an contact ", async () => {
    const response = await request(app).post("/user/").send(userData);
    const logIn = await request(app).post("/login").send(userLogin);

    const { token } = logIn.body;
    const user = await request(app)
      .get("/user/profile")
      .set("Authorization", `Token ${token}`);

    const contact = await request(app)
      .post("/contacts")
      .send(contactData)
      .set("Authorization", `Token ${token}`);

    const getContacts = await request(app)
      .get("/contacts")
      .set("Authorization", `Token ${token}`);

    const contactId = getContacts.body[0].id;

    const contactPatch = await request(app)
      .delete(`/contacts/${contactId}`)

      .set("Authorization", `Token ${token}`);

    expect(contactPatch.status).toEqual(204);
  });

  test("Trying to delete an contact ", async () => {
    const response = await request(app).post("/user/").send(userData);
    const logIn = await request(app).post("/login").send(userLogin);

    const { token } = logIn.body;
    const user = await request(app)
      .get("/user/profile")
      .set("Authorization", `Token ${token}`);

    const contact = await request(app)
      .post("/contacts")
      .send(contactData)
      .set("Authorization", `Token ${token}`);

    const getContacts = await request(app)
      .get("/contacts")
      .set("Authorization", `Token ${token}`);

    const contactId = getContacts.body[0].id;

    const contactPatch = await request(app).delete(`/contacts/${contactId}`);

    expect(contactPatch.status).toEqual(401);
    expect(contactPatch.body).toHaveProperty(
      "message",
      "Missing Authentication"
    );
  });
});
