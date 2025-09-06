import User from "../models/user.model.js";
import Message from "../models/message.model.js";


export const getUsersForSideBar=async(req,res)=>{
    try {
        const loggedInUserId = req.user._id;
        // Fetch all users except the logged-in user
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password');

        return res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error fetching users for sidebar:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

export const getMessages=async(req,res)=>{
    try {
        const {id:userToChatId}=req.params
        const senderId=req.user._id;

        const messages=await Message.find({
            $or:[
                {senderId:senderId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:senderId}
            ]
        })
        res.status(200).json(messages)
    } catch (error) {
        console.error("Error fetching messages:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

export const sendMessage=async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}