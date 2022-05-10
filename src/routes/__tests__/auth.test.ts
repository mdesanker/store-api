import app from "./app";
import request from "supertest";
import initializeTestServer from "../../utils/mongoTestConfig";
import mongoose from "mongoose";
import seedDB from "./seed";

// GLOBAL VARIABLES

// TEST SETUP
beforeAll(async () => {
  await initializeTestServer();
  await seedDB();
});

afterAll(() => {
  mongoose.connection.close();
});

// REGISTER ROUTES
describe("POST /auth/regsiter", () => {
  it("return token for new user", async () => {
    const res = await request(app).post("/auth/register").send({
      username: "test",
      email: "test@gmail.com",
      password: "password",
      isAdmin: true,
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token");
  });

  it("return error for missing field", async () => {
    const res = await request(app).post("/auth/register").send({
      username: "test2",
      email: "",
      password: "password",
      isAdmin: true,
    });

    expect(res.statusCode).toEqual(422);
    expect(res.body.errors[0].msg).toEqual("Email is required");
  });

  it("return error for email already associated with account", async () => {
    const res = await request(app).post("/auth/register").send({
      username: "tested",
      email: "test@gmail.com",
      password: "password",
      isAdmin: false,
    });

    expect(res.statusCode).toEqual(409);
    expect(res.body.errors[0].msg).toEqual("Email already in use");
  });
});

// LOGIN ROUTES
describe("POST /auth/login", () => {
  it("return token for successful login", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "jane@gmail.com",
      password: "password",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  it("return error for missing field", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "",
      password: "password",
    });

    expect(res.statusCode).toEqual(422);
    expect(res.body.errors[0].msg).toEqual("Email is required");
  });

  it("return error for invalid credentials", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "jane@gmail.com",
      password: "password1",
    });

    expect(res.statusCode).toEqual(401);
    expect(res.body.errors[0].msg).toEqual("Invalid credentials");
  });
});
