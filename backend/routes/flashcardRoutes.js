const express =
require("express");

const axios =
require("axios");

const Flashcard =
require("../models/Flashcard");

const router =
express.Router();

/* Generate Flashcards */

router.post(

"/generate",

async(req,res)=>{

try{

const {

userId,
subject,
topic,
notes

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

`You are an AI Flashcard Generator.

Generate minimum 7 and maximum 15 high quality flashcards from the notes.

Rules:

1. Cover all important concepts.
2. Include definitions, examples, formulas, and key points.
3. Keep answers concise and student friendly.
4. Mix Easy, Medium, and Hard difficulty levels.
5. Avoid duplicate flashcards.
6. Make flashcards useful for quick revision.
7. Return ONLY JSON array format.

Example:

[
 {
   "question":"What is JVM?",
   "answer":"Java Virtual Machine",
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

const flashcards =

JSON.parse(

aiReply

);

/* Save Flashcards */

const savedCards =

await Promise.all(

flashcards.map(

(card)=>

Flashcard.create({

userId,

subject,

topic,

question:

card.question,

answer:

card.answer,

difficulty:

card.difficulty ||

"Easy"

})

)

);

res.json({

message:

"Flashcards Generated",

flashcards:

savedCards

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

"Flashcard Generation Failed"

});

}

}

);

/* Get User Flashcards */

router.get(

"/:userId",

async(req,res)=>{

try{

const flashcards =

await Flashcard.find({

userId:

req.params.userId

})

.sort({

createdAt:-1

});

res.json(

flashcards

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

module.exports =
router;