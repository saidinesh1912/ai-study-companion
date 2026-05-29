const express =
require("express");

const axios =
require("axios");

const Note =
require("../models/Note");

const router =
express.Router();

/* Generate Notes */

router.post(

"/generate",

async(req,res)=>{

try{

const {

userId,
subject,
title,
technique,
content

}=req.body;

if(

!content ||

!subject ||

!technique

){

return res

.status(400)

.json({

error:

"Missing Fields"

});

}

let systemPrompt="";

if(

technique==="Balanced"

){

systemPrompt=

`Generate well structured academic notes.

Rules:

- syllabus oriented
- important points
- balanced explanation
- definitions
- exam friendly
- concise and clear`;

}

else if(

technique==="Feynman"

){

systemPrompt=

`Generate notes using the Feynman Technique.

Rules:

- explain in simple English
- beginner friendly
- use analogies
- easy explanations
- simplify difficult concepts`;

}

const response=

await axios.post(

"https://openrouter.ai/api/v1/chat/completions",

{

model:

"openai/gpt-3.5-turbo",

messages:[

{

role:"system",

content:systemPrompt

},

{

role:"user",

content:

`Subject:
${subject}

Content:
${content}`

}

]

},

{

headers:{

Authorization:

`Bearer ${process.env.OPENROUTER_API_KEY}`,

"Content-Type":

"application/json",

"HTTP-Referer":

"http://localhost:5173",

"X-Title":

"AI Study Companion"

}

}

);

const generatedNotes=

response.data
.choices[0]
.message
.content;

const savedNote=

await Note.create({

userId,

subject,

title,

technique,

notes:

generatedNotes

});

res.json({

message:

"Notes Generated",

note:

savedNote

});

}

catch(error){

console.log(

error.response?.data ||

error.message

);

res

.status(500)

.json({

error:

"Notes Failed"

});

}

}

);

/* Get User Notes */

router.get(

"/:userId",

async(req,res)=>{

try{

const notes=

await Note.find({

userId:

req.params.userId

})

.sort({

createdAt:-1

});

res.json(

notes

);

}

catch(error){

console.log(error);

res

.status(500)

.json({

error:

"Fetch Failed"

});

}

}

);

module.exports=
router;