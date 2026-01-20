// here we write logic to interact with database

const userModel=require('../models/user.model');


module.exports.createUser=async({
    firstname,lastname,email,password
})=>{
    if(!firstname || !lastname || !email || !password){
        throw new Error("All fields are required");
    }
    const user=await userModel.create({//  user ko create kr rha ye 
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    });
    return user;
}