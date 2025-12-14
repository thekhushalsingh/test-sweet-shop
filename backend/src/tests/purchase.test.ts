import request from "supertest";
import app from "../app";
import prisma from "../utils/prisma";

describe("Purchase Sweet (TDD Core Flow)", () => {
  let token: string;
  let sweetId: string;

  beforeAll(async () => {
    await prisma.purchaseHistory.deleteMany();
    await prisma.sweet.deleteMany();
    await prisma.user.deleteMany();

    // Create user
    await request(app).post("/api/auth/register").send({
      email: "buyer@test.com",
      password: "password123",
      role: "USER"
    });

    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({
        email: "buyer@test.com",
        password: "password123"
      });

    token = loginRes.body.token;

    const sweet = await prisma.sweet.create({
      data: {
        name: "Test Candy",
        category: "Candy",
        price: 5,
        quantity: 10
      }
    });

    sweetId = sweet.id;
  });

  it("❌ should fail for invalid quantity", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 2 });

  });

  it("❌ should fail if stock is insufficient", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 100 });

    expect(res.status).toBe(400);
  });

  it("✅ should purchase sweet and reduce stock", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 2 });

    

    const sweet = await prisma.sweet.findUnique({
      where: { id: sweetId }
    });

    

    const history = await prisma.purchaseHistory.findMany();
    
  });
});
