const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const captainSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:2
    },
        lastname:{
            type:String,
            required:true,
            minlength:2
    }
},
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    socketId:{
        type:String,
    },
    status:{
        type:String,
        enum:['available','unavailable'],
        default:'unavailable'
    },
    Vehicle:{
        colour:{
            type:String,
            required:true
        },
        plate:{
            type:String,
            required:true,
            unique:true
        },
        capacity:{
            type:Number,
            required:true,

        },
        vehicletype:{
            type:String,
            enum:['car','bike','auto'],
            required:true
        },
        location:{
            lat:{
                type:Number,
                
            },
            long:{
                type:Number,
            }
        }

    }

})

// 🔐 HASH PASSWORD BEFORE SAVE automatically hashes the user’s password before saving it to the database.

captainSchema.method.generateAuthToken=function(){
    const token=jwt.sign(
        {id:this._id},
        process.env.JWT_SECRET,
        {expiresIn:'24h'}
    );
    return token;

captainSchema.method.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);

captainSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10);


}

}
}
const captainModel=mongoose.model('Captain',captainSchema);
module.exports=captainModel;