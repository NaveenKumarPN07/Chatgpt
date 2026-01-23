import User from "../model/User";
import jwt from "jsonwebtoken"
// Genrate JWT 

const genarateToken = (id)=>{
    return jwt.sign({id})
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



    } catch (error) {
        
    }
}