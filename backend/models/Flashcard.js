const mongoose =
require("mongoose");

const flashcardSchema =

new mongoose.Schema({

userId:{

type:String,

required:true

},

subject:{

type:String,

required:true

},

topic:{

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

difficulty:{

type:String,

default:"Easy"

},

createdAt:{

type:Date,

default:Date.now

}

});

module.exports =

mongoose.model(

"Flashcard",

flashcardSchema

);