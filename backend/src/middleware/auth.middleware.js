import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute=async(req,res,next)=>{
    try {
        const token=req.cookies.jwt
        //console.log("Cookies in request:", req.cookies); // Check if cookies are being received
        //console.log("Token from cookies:", token); // Check if the jwt token is present
        if(!token){
            return res.status(401).json({message:"Not authorized, no token"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        //console.log("Decoded token:", decoded);
        if(!decoded){
            return res.status(401).json({message:"Not authorized, token failed"});
        }

        const user=await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(401).json({message:"user not found"});
        }
        req.user=user;
        next();

    } catch (error) {
        
        console.error("Error in protectRoute middleware:",error);
        return res.status(500).json({message:"Server error"});
    }
}