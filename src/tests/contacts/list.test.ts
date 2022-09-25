import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import app from "../../app";
import request from "supertest";
import { userData, userLogin } from "../user/user.mock";
import { contactData } from "./contact.mock";

describe("Testing GET method in /contacts", () => {
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

  test("Trying to list a contact ", async () => {
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

    const getContacts = await request(app)
      .get("/contacts")
      .set("Authorization", `Token ${token}`);

    expect(getContacts.status).toEqual(200);
    expect(getContacts.body.length).toEqual(1);
  });

  test("Trying to list a contact without credentials", async () => {
    const response = await request(app).post("/user/").send(userData);
    const logIn = await request(app).post("/login").send(userLogin);

    const { token } = logIn.body;
    const user = await request(app)
      .get("/user/profile")
      .set("Authorization", `Token ${token}`);

    const getContacts = await request(app).get("/contacts");

    expect(getContacts.status).toEqual(401);
    expect(getContacts.body).toHaveProperty(
      "message",
      "Missing Authentication"
    );
  });
});
