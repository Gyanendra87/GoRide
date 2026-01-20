const express = require('express');
const router = express.Router();

// Define your user-related routes here
// Example: router.post('/register', userController.registerUser);
const {body}=require('express-validator');
const userController=require('../controllers/user.controller');

router.post('/register',[
    body('email').isEmail().isLength({min:5}).withMessage("invalid email"),
    body("password").isLength({min:5}).withMessage("password must be at least 5 characters long")
],
userController.registerUser);








module.exports=router;