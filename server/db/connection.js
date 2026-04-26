import { MongoClient, ServerApiVersion } from "mongodb";

// Pulling MongoDB connection string from env. variables
const uri = process.env.ATLAS_URI || "";

// Create MongoDB client instance
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1, // use stable api version 1.
    strict: true, // error if you use unsupported features.
    deprecationErrors: true, // throw errors for deprecated usage.
  },
});

// Connect to MongoDB
try {
  // Connect the client to the cluster (server)
  await client.connect();
  // Send a ping to confirm a successful connection (health check)
  await client.db("admin").command({ ping: 1 });
  console.log(
   "Pinged your deployment. You successfully connected to MongoDB!"
  );
} catch(err) {
  console.error(err);
}

// Select the database to work on from current cluster
let db = client.db("todolist");

export default db;