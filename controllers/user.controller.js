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
