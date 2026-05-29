const express =
require("express");

const QuizResult =
require("../models/QuizResult");

const router =
express.Router();

/* Save Quiz Result */

router.post(

"/save",

async(req,res)=>{

try{

const {

userId,
subject,
topic,
score,
totalQuestions,
accuracy,
answers

}=req.body;

const result =

await QuizResult.create({

userId,

subject,

topic,

score,

totalQuestions,

accuracy,

answers

});

res.json({

message:

"Quiz Result Saved",

result

});

}

catch(error){

console.log(error);

res

.status(500)

.json({

error:

"Save Failed"

});

}

}

);

/* Get User Quiz History */

router.get(

"/:userId",

async(req,res)=>{

try{

const results =

await QuizResult.find({

userId:

req.params.userId

})

.sort({

createdAt:-1

});

res.json(

results

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

/* Get Single Quiz Review */

router.get(

"/review/:id",

async(req,res)=>{

try{

const result =

await QuizResult.findById(

req.params.id

);

res.json(

result

);

}

catch(error){

console.log(error);

res

.status(500)

.json({

error:

"Review Failed"

});

}

}

);

module.exports =
router;