import {create} from 'zustand'
import axiosInstance from '../lib/axios.js'
import { toast } from 'react-hot-toast';
import { io } from 'socket.io-client';

const BACKEND_URL=import.meta.env.MODE==="development"?"http://localhost:5001":"/"

export const useAuthStore = create((set,get) => ({
    authUser: null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    onlineUsers:[],
    isCheckingAuth:true,
    socket:null,

    checkAuth: async ()=>{
        try {
            const res=await axiosInstance.get('/auth/check')
            console.log("checkAuth response:",res.data)
            set({authUser:res.data})
            get().connectSocket()
        } catch (error) {
            console.log("checkAuth failed",error)
            set({authUser:null})
            
        } finally{
            set({isCheckingAuth:false})
        }
    },

    signup: async(data)=>{
        set({isSigningUp:true})
        try {
            const res=await axiosInstance.post('/auth/signup',data)
            set({authUser:res.data})
            toast.success("Signup successful")
            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message || "Signup failed")
        }
        finally{
            set({isSigningUp:false})
        }
    },

    logout: async()=>{
        try {
            await axiosInstance.post('/auth/logout')
            set({authUser:null})
            toast.success("Logged out successfully")

            get().disconnectSocket()
        } catch (error) {
            toast.error(error.response.data.message || "Logout failed")
        }

    },

    login: async(data)=>{
        set({isLoggingIn:true})
        try {
            const res=await axiosInstance.post('/auth/login',data)
            set({authUser:res.data})
            toast.success("Login successful")

            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message || "Login failed")
            
        }
        finally{
            set({isLoggingIn:false})
        }
    },


    updateProfile: async (data)=>{
        set({isUpdatingProfile:true})
        try {
            
            const res=await axiosInstance.put('/auth/update-profile',data)
            set({authUser:res.data})
            toast.success("Profile updated successfully")

        } catch (error) {
            toast.error(error.response.data.message || "Profile update failed")
        } finally{
            set({isUpdatingProfile:false})
            
        }
    },

    connectSocket: ()=>{
        const {authUser}=get()
        if(!authUser || get().socket?.connected){
            console.log("No auth user, cannot connect socket")
            return;
        }
        const socket=io(BACKEND_URL,{
            query:{
                userId:authUser._id
            }
        })
        socket.connect()
        set({socket:socket})

        socket.on("getOnlineUsers",(users)=>{
            set({onlineUsers:users})
        })

    },

    disconnectSocket: ()=>{
        if(get().socket()?.connected) get().socket.disconnect();
    }


}))