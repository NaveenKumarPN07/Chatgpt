import e from 'express'
import mongoose from 'mongoose'

const connectDB = async ()=> {
    try{
        mongoose.connection.on('connected',()=>console.log('database connceted'))
        await mongoose.connect(`${process.env.MONGODB_URL}/chatgptlite`)
    }
    catch(error){
        console.log(error.message)
    }
}

export default connectDB