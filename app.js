const express=require('express');
const app=express();
const dotenv=require('dotenv');
dotenv.config();
const cors=require('cors');
app.use(cors());
const connectToDb=require('./db/db');   
connectToDb();
const cookieParser=require('cookie-parser');
app.use(cookieParser());

const userRoutes=require('./routes/user.routes');
const captainRoutes=require('./routes/captain.routes');
app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use('/users',userRoutes);
app.use('/captains',captainRoutes);



app.get('/',(req,res)=>{
    res.send("hello gyan")
});

module.exports=app;