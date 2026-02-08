import Chat from "../model/Chat.js"

// API to create a new chat
export const createChat = async (req,res)=>{
    try {
        const userId = req.user._id
        
        const chatData = {
            userId,
            messages:[],
            name:"New Chat",
            userName:req.user.name
        }
        
        await Chat.create(chatData)
        
        res.json({success:true,messsage:"Chat created successfully"})

    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

// Api controller to get all chats of a user
export const getChats = async (req,res)=>{
    try {
        const userId = req.user._id;
        const chats = await Chat.find({userId}).sort({updatedAt:-1})

        res.json({success:true,chats:chats})

    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

// API to delete a chat

export const deleteChat = async (req,res)=>{
    try {
        const userId = req.user._id;
        const {chatId} = req.body;

        await Chat.deleteOne({_id:chatId,userId});
        res.json({success:true,message:"Chat deleted successfully"})
    } catch (error) {
        
    }
}