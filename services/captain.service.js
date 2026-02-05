const captainModel = require('../models/captain.model');
module.exports.createCaptain=async({
    firstname,lastname,email,password,color,plate,vehicleType
})=>{
    if(!firstname || !lastname || !email || !password || !color || !plate || !vehicleType){
        throw new Error("All fields are required");
    }
    const captain=await captainModel.create({//  captain ko create kr rha ye
        fullname:{
            firstname,
            lastname
        },
        email,
        password,               
        vehicleDetails:{
            color,
            plate,
            capacity,
            vehicleType
        }
    });
    return captain;


}