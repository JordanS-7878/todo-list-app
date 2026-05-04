import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import custom route file
import taskRoutes from "./routes/taskRoutes.js";
import { connectDB } from "./db/connection.js";

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

app.use("/api/tasks", taskRoutes); // Additional `/api` prefix for better API organization

// start the Express server
// listen for requests at port 5050
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
