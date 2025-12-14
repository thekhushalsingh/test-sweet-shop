import request from "supertest";
import app from "../app";
import prisma from "../utils/prisma";

describe("Admin Sweet Management", () => {
  let adminToken: string;

  beforeAll(async () => {
    await prisma.sweet.deleteMany();
    await prisma.user.deleteMany();

    await request(app).post("/api/auth/register").send({
      email: "admin@test.com",
      password: "password123",
      role: "ADMIN"
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@test.com",
        password: "password123"
      });

    adminToken = res.body.token;
  });

  it("✅ admin should add sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Admin Sweet",
        category: "Special",
        price: 20,
        quantity: 10
      });

    expect(res.status).toBe(201);
  });

  it("✅ admin should delete sweet", async () => {
    const sweet = await prisma.sweet.findFirst();

    const res = await request(app)
      .delete(`/api/sweets/${sweet?.id}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
  });
});
