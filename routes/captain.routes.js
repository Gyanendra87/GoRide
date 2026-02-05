const express=require('express');
const router=express.Router();
const captainController=require('../controllers/captain.controller');
const {body}=require('express-validator');
const authmiddleware=require('../middleware/auth.middleware');


router.post('/register',[
    body('email').isEmail().isLength({min:5}).withMessage("invalid email"),
    body("password").isLength({min:5}).withMessage("password must be at least 5 characters long"),
    body("Vehicle.plate").isLength({min:2}).withMessage("invalid vehicle plate"),   
    body("Vehicle.colour").isLength({min:2}).withMessage("invalid vehicle colour"),
    body("Vehicle.capacity").isInt({min:1}).withMessage("invalid vehicle capacity"),
    body("Vehicle.vehicletype").isIn(['car','bike','auto']).withMessage("invalid vehicle type")
    
],
captainController.registerCaptain);

router.post("/login",captainController.loginCaptain);

router.get("/profile", authmiddleware.authCaptain, captainController.getCaptainProfile);







module.exports=router;