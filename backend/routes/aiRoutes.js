const express =
require("express");

const axios =
require("axios");

const Chat =
require("../models/Chat");

const router =
express.Router();

/* AI Chat */

router.post(

"/chat",

async(req,res)=>{

try{

const {

message,
subject,
userId

}=req.body;

if(

!message

){

return res

.status(400)

.json({

error:

"Message Required"

});

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

content:

`You are an AI Study Companion.

The selected subject is:

${subject || "General"}.

You MUST answer ONLY questions related to this subject.

If the question is outside the selected subject,
DO NOT answer it.

Instead reply exactly:

"This question does not belong to ${subject}. Please switch the subject."

Rules:

- DSA → only DSA concepts
- DBMS → only DBMS concepts
- Java → only Java concepts
- Web Dev → only Web Development
- OS → only Operating Systems
- CN → only Computer Networks

Give clean student friendly answers only for the selected subject.`

},

{

role:"user",

content:

message

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

const aiReply=

response.data
.choices[0]
.message
.content;

const savedChat=

await Chat.create({

userId,

subject:

subject ||

"General",

question:

message,

answer:

aiReply

});

console.log(

"Saved Chat:",

savedChat

);

res.json({

reply:

aiReply

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

"AI Failed"

});

}

}

);

/* Full User History */

router.get(

"/history/:userId",

async(req,res)=>{

try{

const chats=

await Chat.find({

userId:

req.params.userId

})

.sort({

createdAt:-1

});

res.json(

chats

);

}

catch(error){

console.log(error);

res

.status(500)

.json({

error:

"History Failed"

});

}

}

);

/* Subject Wise History */

router.get(

"/history/:userId/:subject",

async(req,res)=>{

try{

const chats=

await Chat.find({

userId:

req.params.userId,

subject:

req.params.subject

})

.sort({

createdAt:-1

});

res.json(

chats

);

}

catch(error){

console.log(error);

res

.status(500)

.json({

error:

"Subject Failed"

});

}

}

);

module.exports=
router;