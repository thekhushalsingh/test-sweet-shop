import request from "supertest";
import app from "../app";
import prisma from "../utils/prisma";

describe("Auth API", () => {
  beforeAll(async () => {
    
    
  });

  it("✅ should register a user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        email: "testuser@example.com",
        password: "password123",
        role: "USER"
      });

    
    
  });

  it("✅ should login user and return token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "testuser@example.com",
        password: "password123"
      });

    
    expect(res.body.token).toBeDefined();
  });
});
