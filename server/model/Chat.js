import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    isImage: { type: Boolean, required: true },
    isPublished: { type: Boolean },
    role: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Number, required: true }
}, { timestamps: true }); // optional (for messages)

const chatSchema = new mongoose.Schema({
    userId :{type:String,ref:'User',required:true},
    userName:{type:String,required:true},
    name:{type:String,required:true},
    message:[messageSchema]
},{timestamps:true  })

const Chat =mongoose.models.Chat|| mongoose.model('Chat',chatSchema)

export default Chat;