const mongoose =
require("mongoose");

const NoteSchema =
new mongoose.Schema({

userId:{
type:String,
required:true
},

subject:{
type:String,
required:true
},

pdfId:{
type:String
},

title:{
type:String,
required:true
},

technique:{
type:String,
required:true
},

notes:{
type:String,
required:true
},

createdAt:{
type:Date,
default:Date.now
}

});

const Note =
mongoose.model(
"Note",
NoteSchema
);

module.exports =
Note;