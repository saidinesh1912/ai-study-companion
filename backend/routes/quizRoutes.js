const express =
require("express");

const axios =
require("axios");

const router =
express.Router();

/* Generate AI Quiz */

router.post(

"/generate",

async(req,res)=>{

try{

const {

notes,
subject,
topic

}=req.body;

if(

!notes

){

return res

.status(400)

.json({

error:

"Notes Required"

});

}

const response =

await axios.post(

"https://openrouter.ai/api/v1/chat/completions",

{

model:

"openai/gpt-3.5-turbo",

messages:[

{

role:"system",

content:

`You are an AI Quiz Generator.

Generate 10 multiple choice questions from the notes.

Rules:

1. Include Easy, Medium, and Hard questions.
2. Each question must have 4 options.
3. Include correct answer.
4. Include short explanation.
5. Keep questions student friendly.
6. Return ONLY JSON array format.

Example:

[
 {
   "question":"What is JVM?",
   "options":[
      "Java Virtual Machine",
      "Java Variable Method",
      "Joint Vector Machine",
      "None"
   ],
   "correctAnswer":"Java Virtual Machine",
   "explanation":"JVM executes Java bytecode.",
   "difficulty":"Easy"
 }
]`

},

{

role:"user",

content:notes

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

let aiReply =

response.data
.choices[0]
.message
.content;

/* Remove Markdown */

aiReply =

aiReply

.replace(

/```json/g,

""

)

.replace(

/```/g,

""

)

.trim();

/* Convert JSON */

const quiz =

JSON.parse(

aiReply

);

res.json({

message:

"Quiz Generated",

quiz

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

"Quiz Generation Failed"

});

}

}

);

module.exports =
router;