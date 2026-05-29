const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

router.post("/login", async(req,res)=>{

try{

const {email,password}=req.body;

const user=await User.findOne({email});

if(!user){

return res.status(404)
.json({message:"User not found"});

}

const validPassword=
await bcrypt.compare(
password,
user.password
);

if(!validPassword){

return res.status(400)
.json({message:"Invalid Password"});

}

const token=jwt.sign(

{id:user._id},

process.env.JWT_SECRET,

{expiresIn:"1d"}

);

res.status(200).json({

message:"Login Successful",

token

});

}

catch(error){

res.status(500)
.json(error);

}

});

module.exports=router;