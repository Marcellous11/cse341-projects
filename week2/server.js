import express from "express";
import { connectMongo, closeDB } from "./data/db.js";
import cors from "cors";
import routes from './routes/index.js'

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080

//! All Routes start here
app.use(routes)

app.use((req,res,next)=>{
  const error = new Error("Page not found")
  error.status = 404
  next(error)
})

app.use((err, req, res, next) => {
  console.log(err);
  const status = err.status || 500
  res.status(status).json({ error: err.message|| "Request failed" });
});

connectMongo().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}).catch(err =>{
    console.error('Startup failed:', err);
    process.exit(1);
});

async function gracefulShutdown() {
  console.log("Shutting Down...");
  await closeDB();
  process.exit(0);
}

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
