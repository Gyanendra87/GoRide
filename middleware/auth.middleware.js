const userModel=require('../models/user.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const Blacklist=require('../models/blacklist.model');
const captainModel=require('../models/captain.model');
module.exports.authUser=async(req,res,next)=>{
    try{
        const token =req.cookies.token || req.headers.authorization.split(" ")[1]   ;
        if(!token){
            return res.status(401).json({message:"Access Denied. No token provided."});     
        }
        const isBlacklisted=await Blacklist.findOne({token});
        if(isBlacklisted){
            return res.status(401).json({message:"Token is blacklisted. Please login again."});
        }

        const  decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await userModel.findById(decoded.id);
        if(!user){
            return res.status(401).json({message:"User not found."});
        }
        req.user=user;
        next();
    }
    catch(err){
        res.status(401).json({message:"Invalid token."});
    }
    
}

module.exports.authCaptain=async(req,res,next)=>{
    try{
        const token =req.cookies.token || req.headers.authorization.split(" ")[1]   ;
        if(!token){
            return res.status(401).json({message:"Access Denied. No token provided."});     
        }   
        const isBlacklisted=await Blacklist.findOne({token});
        if(isBlacklisted){
            return res.status(401).json({message:"Token is blacklisted. Please login again."});
        }
        const  decoded=jwt.verify(token,process.env.JWT_SECRET);
        const captain=await captainModel.findById(decoded.id);  
        if(!captain){
            return res.status(401).json({message:"Captain not found."});
        }
        req.captain=captain;
        next();
    }
    catch(err){
        res.status(401).json({message:"Invalid token."});
    }
};
