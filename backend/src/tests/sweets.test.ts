import request from "supertest";
import app from "../app";
import prisma from "../utils/prisma";

describe("Sweet APIs", () => {
  beforeAll(async () => {
    await prisma.purchaseHistory.deleteMany();
    await prisma.sweet.deleteMany();
  });

  it("✅ should fetch all sweets", async () => {
    await prisma.sweet.create({
      data: {
        name: "Chocolate Bar",
        category: "Chocolate",
        price: 10,
        quantity: 50
      }
    });

    const res = await request(app).get("/api/sweets");

  });

  it("✅ should search sweets by category", async () => {
    const res = await request(app)
      .get("/api/sweets/search")
      .query({ category: "Chocolate" });

    
  });
});
