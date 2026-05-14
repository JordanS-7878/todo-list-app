import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import custom route file
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { connectDB } from "./db/connection.js";
import path from "path";

dotenv.config();

// create the app
const app = express();
const PORT = process.env.PORT || 5050;

// enables cross-origin requests
app.use(cors());
// enables server to understand JSON in request bodies
// without this, req.body would be undefined when sending JSON
app.use(express.json());

// connect DB
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes); // Additional `/api` prefix for better API organization
app.use("/api/users", userRoutes);
app.use("/uploads", express.static("uploads"));

// start the Express server
// listen for requests at port 5050
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
