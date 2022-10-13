import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import {connectdb} from './mongodb/connectdb.js';
import {router} from './routes/web.js';

const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

connectdb(DATABASE_URL)

app.use(express.json()) 
app.use("/user", router)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})