const mongoose=require("mongoose");

function connectToDb(){
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("Connected to DataBase");
    }).catch((err)=>{
        console.log("Error while connecting to DataBase",err);
    })      
}

module.exports=connectToDb;