import express from "express";
import cors from "cors";
// import custom route file
import records from "./routes/record.js";

const PORT = process.env.PORT || 5050
// create the app
const app = express();

// enables cross-origin requests
app.use(cors());
// enables server to understand JSON in request bodies
// without this, req.body would be undefined when sending JSON
app.use(express.json());

// route mounting: if record.js have route.get("/") and route.post("/add"), they become GET /record and POST /record/add
app.use("/record", records);

// start the Express server
// listen for requests at port 5050
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});