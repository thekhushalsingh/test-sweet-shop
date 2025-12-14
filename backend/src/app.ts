import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import sweetRoutes from "./routes/sweet.routes";
import purchaseRoutes from "./routes/purchase.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);
app.use("/api/purchases", purchaseRoutes);

app.get("/", (_, res) => {
  res.send("🍬 Sweet Shop API is running");
});

export default app;
