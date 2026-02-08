import User from "../model/User.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import Chat from "../model/Chat.js";
// Genrate JWT 

const genarateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SCREAT,{expiresIn:'30d'})
}

// Api to register a user


export const registerUser = async (req,res)=>{
    const {name,email,password} = req.body;
    try {
        const userExists = await User.findOne({email})
        
        if(userExists){
            return res.json({success:false,message:"User already exists"})
        }
        
        const user = await User.create({name,email,password})
        const token = genarateToken(user._id)
        res.json({success:true,token})


    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}

// API to login user

export const LoginUser = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email})
        if(user){
            const isMatch = await bcrypt.compare(password,user.password)
            if(isMatch){
                const token = genarateToken(user._id)
                return res.json({success:true,token})
            }

        }
        return res.json({success:false,message:"Ivalid email or password"})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }


}

// API to get user data
export const getUser = async (req,res)=>{
    try {
        const user = req.user;
        res.json({success:true,user})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}


// API to get published images
export const getPubishedImages = async (req,res)=>{
    try {
        const  publishedImagesMessages = await Chat.aggregate([
            {$unwind:"$messages"},
            {
                $match:{
                    "messages.isImage":true,
                    "messages.isPublished":true
                }
            },
            {
                $project:{
                    _id:0,
                    imageUrl:"$messages.content",
                    userName:"$messages.userName"
                }
            }
        ])

        res.json({success:true,images:publishedImagesMessages.reverse()})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}