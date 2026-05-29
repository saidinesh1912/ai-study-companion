const mongoose =
require("mongoose");

const pdfSchema =

new mongoose.Schema({

userId:{

type:String,

required:true

},

subject:{

type:String,

required:true

},

fileName:{

type:String,

required:true

},

fileUrl:{

type:String,

required:true

},

content:{

type:String,

default:""

},

uploadedAt:{

type:Date,

default:Date.now

}

});

module.exports =

mongoose.model(

"Pdf",

pdfSchema

);