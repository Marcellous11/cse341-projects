import express from "express";
import { connectMongo, getDB, closeDB } from "./db.js";
import cors from "cors";

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.get("/contact", async (req, res, next) => {
  try {
    let db = await getDB();
    let contacts = db.collection("Contacts");

    let firstName =req.query.firstName

    const query = { firstName: firstName };
    const user = await contacts.findOne(query);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

app.get("/all_contacts", async (req, res, next) => {
  try {
    let db = await getDB();
    let contacts = db.collection("Contacts");

    const allContacts = await contacts.find().toArray();
    res.json(allContacts);
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ 500: "Request failed" });
});

connectMongo().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});

async function gracefulShutdown() {
  console.log("Shutting Down...");
  await closeDB();
  process.exit(0);
}

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
