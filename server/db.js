import { MongoClient } from "mongodb";
import "dotenv/config";

export const client = new MongoClient(process.env.ATLAS_CONNECTION);

client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
