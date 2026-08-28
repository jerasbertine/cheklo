import "dotenv/config";
import express from "express";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok"});
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});