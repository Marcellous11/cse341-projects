
import { MongoClient, ServerApiVersion } from 'mongodb';
import 'dotenv/config'
const uri = process.env.MONGO_URI;


  const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db

async function connectMongo(){
  await client.connect();
  db = client.db("TwoWeekAssignment")
  console.log("Connected to MongoDB")

}

async function getDB(){
  if(!db){
      throw new Error("Not Connect to MongoDB")
  }
  return db
}

async function closeDB(){
  await client.close()
  console.log("MongoDB has been closed")
}

export {connectMongo, getDB,closeDB}