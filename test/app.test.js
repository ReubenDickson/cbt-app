import request from "supertest";
import { expect } from "chai";
import app from "../app.js";

// Test root route
describe("Basic Routes Test", () => {
  it("should return 200 OK for root route", async () => {
    const res = await request(app).get("/");
    expect(res.status).to.equal(200);
    expect(res.text).to.include("CBT System Backend");
  });
});

