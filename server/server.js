import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js'
const app = express();

await connectDB()

const PORT = process.env.PORT || 8000
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=> {
    res.send("server is running")
})

app.listen(PORT,()=> {
    console.log(`server is running on port ${PORT}`)
})