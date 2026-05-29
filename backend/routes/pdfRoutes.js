const express =
require("express");

const multer =
require("multer");

const Pdf =
require("../models/Pdf");

const router =
express.Router();

/* Storage */

const storage =
multer.diskStorage({

destination:(req,file,cb)=>{

cb(

null,

"uploads/"

);

},

filename:(req,file,cb)=>{

cb(

null,

Date.now()

+

"-"

+

file.originalname

);

}

});

const upload=
multer({

storage

});

/* Upload PDF */

router.post(

"/upload",

upload.single(

"pdf"

),

async(req,res)=>{

try{

const {

userId,
subject

}=req.body;

if(

!req.file

){

return res

.status(400)

.json({

message:

"No PDF uploaded"

});

}

/* Save PDF */

const pdf=

await Pdf.create({

userId,

subject,

fileName:

req.file.originalname,

fileUrl:

req.file.path,

content:

req.file.originalname

});

res.json({

message:

"PDF Uploaded Successfully",

pdf

});

}

catch(error){

console.log(

"PDF ERROR:",

error

);

res

.status(500)

.json({

message:

"Upload Failed"

});

}

}

);

/* Get User PDFs */

router.get(

"/:userId",

async(req,res)=>{

try{

const pdfs=

await Pdf.find({

userId:

req.params.userId

})

.sort({

uploadedAt:-1

});

res.json(

pdfs

);

}

catch(error){

console.log(error);

res

.status(500)

.json({

message:

"Fetch Failed"

});

}

}

);

module.exports=
router;