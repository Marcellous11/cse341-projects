
import express from 'express'
import { connectMongo,getDB, closeDB } from './db.js';
import cors from 'cors'

const app = express()
const port = process.env.PORT || 8080

app.use(express.json());
app.use(cors());

app.get('/professional', async (req, res,next) => {
  try{
      let db = await getDB()
      let users = db.collection("users")

    const query = { professionalName: 'Nathan Birch' };
    const user = await users.findOne(query);
      res.json(user)
  }catch(err){
      next(err)
  }

})



app.use((err,req,res,next) => {
  console.log(err)
  res.status(500).json({500:"Request failed"})
})

connectMongo().then(()=>{
  app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  })

})

async function gracefulShutdown(){
  console.log("Shutting Down...")
  await closeDB()
  process.exit(0)
}

process.on('SIGINT',gracefulShutdown)
process.on('SIGTERM',gracefulShutdown)