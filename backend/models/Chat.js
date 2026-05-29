const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({

userId:{
type:String,
required:true
},

subject:{
type:String,
required:true
},

question:{
type:String,
required:true
},

answer:{
type:String,
required:true
},

createdAt:{
type:Date,
default:Date.now
}

});

const Chat = mongoose.model(
"Chat",
ChatSchema
);

module.exports = Chat;