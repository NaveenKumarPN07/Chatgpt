import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js'
import userRouter from './routes/userRoute.js';
import chatRouter from './routes/chatRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import creditRouter from './routes/creditRoutes.js';
import {stripe} from './controller/webhook.js';
const app = express();

await connectDB()

// stripe webhook route

app.post('api/stripe',express.raw({type:"application/json"}),stripe)

const PORT = process.env.PORT || 8000
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=> {
    res.send("server is running")
})  
app.use('/api/user',userRouter)
app.use('/api/chat',chatRouter);
app.use("/api/message",messageRouter);
app.use("/api/credit",creditRouter);

app.listen(PORT,()=> {
    console.log(`server is running on port ${PORT}`)
})