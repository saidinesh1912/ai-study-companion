const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

router.post("/signup",async(req,res)=>{

try{

const {name,email,password}=req.body;

const existingUser =
await User.findOne({email});

if(existingUser){

return res
.status(400)
json({message:"User already exists"});

}

const hashedPassword =
await bcrypt.hash(password,10);

const user =
new User({

name,
email,
password:hashedPassword

});

await user.save();

res.status(201)
.json({message:"Signup successful"});

}

catch(error){

res.status(500)
.json(error);

}

});

module.exports=router;