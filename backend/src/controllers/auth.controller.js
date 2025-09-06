import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup= async(req,res)=>{
    
    const {email,fullName,password}=req.body;
    try{

        if(!email || !fullName || !password){
            return res.status(400).json({message:"Please provide all required fields"});
        }
        //hash the password
        if(password.length<6){
            return res.status(400).json({message:"Password must be at least 6 characters long"});
        }

        const user =await User.findOne({email})

        if(user){
            return res.status(400).json({message:"Email already exists"});
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=new User({
            fullName,
            email,
            password:hashedPassword
        })

        if(newUser){
            //generate jwt token 
            await newUser.save();

            generateToken(newUser._id,res);

            // const users = await User.find();
            // console.log(users);

            
            return res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic
            })
        }
        else{
            return res.status(400).json({message:"Invalid user data"});
        }

    }catch(err){
        console.error("Error in signup:",err);
        return res.status(500).json({message:"Server error"});
    }
}

export const login=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user= await User.findOne({email})

        if(!user){
            return res.status(400).json({message:"Invalid email or password"});
        }
        const isPasswordCorrect=await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid email or password"});
        }
        generateToken(user._id,res);

        return res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic
        })

    } catch (error) {
        console.log("Error in login:",error);
        return res.status(500).json({message:"Server error"});
    }
}

export const logout=async(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        return res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
        console.log("Error in logout:",error);
        return res.status(500).json({message:"Server error"});
    }
}


export const updateProfile=async(req,res)=>{
    try {
        const {profilePic}=req.body;
        const user_id=req.user._id

        if(!profilePic){
            return res.status(400).json({message:"Please provide profile picture"});
        }

       const uploadResponse= await cloudinary.uploader.upload(profilePic)
         const updatedUser= await User.findByIdAndUpdate(user_id,
            {profilePic:uploadResponse.secure_url},
            {new:true})
        return res.status(200).json(updatedUser)


    } catch (error) {
        
        console.log("Error in updateProfile:",error);
        return res.status(500).json({message:"Server error"});
    }
}

export const checkAuth=async(req,res)=>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth:",error);
        return res.status(500).json({message:"Server error"});
    }
}