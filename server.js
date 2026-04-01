import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/auth.routes.js";
import recordRoutes from "./src/routes/record.routes.js";

const allowedOrigins = [
  "http://localhost:5173",
  "https://unicalc-delta.vercel.app",
];


const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(morgan("dev"));

connectDB();

app.get("/", (req, res) => {
  res.send("Unicalc Backend in development progress");
});

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.options("*", cors());

app.use("/api/auth", authRoutes);
app.use("/api/records", recordRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
