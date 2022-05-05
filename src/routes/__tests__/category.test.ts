import app from "./app";
import request from "supertest";
import initializeTestServer from "../../utils/mongoTestConfig";
import mongoose from "mongoose";
import seedDB from "./seed";

// GLOBAL VARIABLES
const electronicsId: string = "6273e6a3ec15bc98702471c3";
const clothingId: string = "6273e6a3ec15bc98702471c4";
const invalidCategoryId: string = "6273e6a3ec15bc9870200000";

// TEST SETUP
beforeAll(async () => {
  await initializeTestServer();
  await seedDB();
});

afterAll(() => {
  mongoose.connection.close();
});

// GET ROUTES
describe("GET /category/all", () => {
  it("return array of all product categories", async () => {
    const res = await request(app).get("/category/all");

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /category/:id", () => {
  it("return specific category", async () => {
    const res = await request(app).get(`/category/${electronicsId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toEqual("Electronics");
    expect(res.body.description).toEqual("Electrons go brrr");
  });

  it("return error for invalid category id", async () => {
    const res = await request(app).get(`/category/${invalidCategoryId}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body.errors[0].msg).toEqual("Invalid category id");
  });
});
