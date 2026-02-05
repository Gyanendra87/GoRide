// const userModel = require('../models/user.model');
// const userService = require('../services/user.service');    
// const {validationResult} = require('express-validator');
// const hashPassword=require('../services/user.service').hashPassword;
// module.exports.registerUser=async (req,res,next)=>{/// hm controller me validation kr rhe h
//     const errors=validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors:errors.array()});
//     }   

//     const {fullname,email,password}=req.body;


//     const hashPassword=await userModel.hashPassword(password);

//     const user=await userService.createUser({
//         firstname:fullname.firstname,
//         lastname:fullname.lastname,
//         email,
//         password:hashPassword
//     });
//     //yha controller service ko bol rha hain user create krne ko
//     //service model use krke db me user ko save k rega
//     const token=user.generateAuthToken();
//     res.status(201).json({
//         message:"User registered successfully",
//         token,user
//     });
// };
// //validate request prepare data   call service    later send response 
// //controller db ka kaam khud nhi krta woh service ko bolta hain

// import the service that handles database interactions
const userService = require('../services/user.service');    
// import express-validator to validate requests
const { validationResult } = require('express-validator');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const blackListTokenModel=require('../models/blacklist.model');

// export registerUser controller function
module.exports.registerUser = async (req, res,next) => {
  try {
    /// hm controller me validation kr rhe h
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return 400 if request has validation errors
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure data from request body
    const { fullname, email, password } = req.body;
    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({ message: "User with this email already exists" });
    }
    // controller ko service ko bol rha hain user create krne ko
    // service model use krke db me user ko save k rega
    // password hashing is handled automatically in the model pre-save hook
    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password // plain password; model will hash it
    });

    // generate JWT token for the user
    const token = user.generateAuthToken();

    // send response
    res.status(201).json({
      message: "User registered successfully",
      token,
      user
    });

  } catch (error) {
    // handle unexpected errors
    res.status(500).json({ error: error.message });
  }
};

// validate request -> prepare data -> call service -> later send response 
// controller db ka kaam khud nhi krta woh service ko bolta hain

module.exports.loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = user.generateAuthToken();// token auruser ko bhej rhe hain hm
    res.status(200).json({
      message: "Login successful",
      token,
      user
    }); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  } 
};
    

module.exports.getUserProfile = async (req, res, next) => {
  try{
    res.status(200).json(req.user);

  }
  catch(error){
    res.status(500).json({ error: error.message });
  }
}

module.exports.logoutUser=async(req,res,next)=>{
  try{
    res.clearCookie('token');
    const token=req.cookies.token || req.headers.authorization.split(" ")[1];
    await blackListTokenModel.create({token});
    res.status(200).json({message:"Logout successful"});
  } catch(error){
    res.status(500).json({ error: error.message });
  } 
}