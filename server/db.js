import { MongoClient } from 'mongodb';
import "dotenv/config";

export const client = new MongoClient(process.env.ATLAS_CONNECTION)