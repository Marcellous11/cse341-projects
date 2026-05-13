import express from "express";
import { connectMongo, closeDB } from "./data/db.js";
import cors from "cors";
import routes from './routes/index.js'

const app = express();


app.use(express.json());
app.use(cors());

// app.use("/api-docs",swaggerUi.serve,swaggerUi,setup(swaggerDocument))
const port = process.env.PORT || 8080

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*")
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin", "X-Requested-with, Content-Type, Accept, Z-Key"
  );
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS")
  next()
})

//! All Routes start here
app.use(routes)

app.use((req,res,next)=>{
  const error = new Error("Page not found")
  error.status = 404
  next(error)
})

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ 500: "Request failed" });
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
