const express = require('express');
const router = express.Router();

// Define your user-related routes here
// Example: router.post('/register', userController.registerUser);
const {body}=require('express-validator');
const userController=require('../controllers/user.controller');
const authmiddleware=require('../middleware/auth.middleware');
router.post('/register',[
    body('email').isEmail().isLength({min:5}).withMessage("invalid email"),
    body("password").isLength({min:5}).withMessage("password must be at least 5 characters long")
],
userController.registerUser);

router.post('/login',[
    body('email').isEmail().isLength({min:5}).withMessage("invalid email"),
    body("password").isLength({min:5}).withMessage("password must be at least 5 characters long")
],userController.loginUser);


router.get('/profile',authmiddleware.authUser,userController.getUserProfile);
router.get('/logout',authmiddleware.authUser,userController.logoutUser);





module.exports=router;