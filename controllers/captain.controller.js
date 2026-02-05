const captainModel = require('../models/captain.model');
const captainService= require('../services/captain.service');
const { validationResult, ExpressValidator } = require('express-validator');


module.exports.registerCaptain=async(req,res)=>{
    const errors=validationResult(req);
    try{
        const { lastname,email,password,vehicleType}=req.body;
        const isCaptainExist=await captainModel.findOne({email});
        if(isCaptainExist){
            return  res.status(400).json({message:"Captain with this email already exists"});
        } 


        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const hashPassword=await captainModel.hashPassword(password);
        const captain=await captainService.createCaptain({
            firstname:req.body.firstname,    
            lastname:lastname,
            email,
            password:hashPassword,
            color:vehicleType.color,
            plate:vehicleType.plate,
            vehicleType:vehicleType.vehicleType
        });
        const token=captain.generateAuthToken();
        res.status(201).json({
            message:"Captain registered successfully",
            token,
            captain
        });



    }
    catch(error){
        res.status(500).json({ error: error.message });
    }

}

module.exports.loginCaptain=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const error=validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({errors:error.array()});
        }
        const captain=await captainModel.findOne({email});
        if(!captain){
            return res.status(400).json({message:"Invalid email or password"});
        }
        const isPasswordValid=await captain.comparePassword(password);
        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid email or password"});
        }
        const token=captain.generateAuthToken();
        res.cookies('token',token);
        res.status(200).json({
            message:"Login successful",
            token,
            captain
        });
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}