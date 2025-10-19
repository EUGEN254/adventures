import express from "express";
import cors from "cors";
import "dotenv/config";
import pool from "./config/connectDb.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/AdminRoute.js";
import connectCloudinary from "./config/cloudinary.js";

const app = express();
const port = process.env.PORT || 4000;
connectCloudinary();

// cors option
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
  allowedHeaders: ["Content-Type", "Authorization", "atoken"],
  optionsSuccessStatus: 200,
};

// other middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// api endpoints
app.use('/api/user',userRouter)
app.use('/api/admin',adminRouter)

// testing endpoint
app.get("/", (req, res) => res.send("API WORKING Mrs. Bitinyo"));

// database connection and server start
const startServer = async () => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    console.log("🤝database connected ");
    app.listen(port, () => {
      console.log(`🚀 Server running on ${port}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);//stops thes server untill database has connected
  }
};

startServer();
