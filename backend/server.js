const express = require("express");

const cors = require("cors");

const mongoose = require("mongoose");

require("dotenv").config();

/* Routes */

const authRoutes =
require("./routes/authRoutes");

const loginRoutes =
require("./routes/loginRoutes");

const aiRoutes =
require("./routes/aiRoutes");

const pdfRoutes =
require("./routes/pdfRoutes");

const noteRoutes =
require("./routes/noteRoutes");

const flashcardRoutes =
require("./routes/flashcardRoutes");

const quizRoutes =
require("./routes/quizRoutes");

const quizResultRoutes =
require("./routes/quizResultRoutes");

const app =
express();

/* Middleware */

app.use(cors());

app.use(express.json());

/* Static Upload Folder */

app.use(

"/uploads",

express.static(

"uploads"

)

);

/* Debug Logs */

console.log(

"Auth Routes Loaded"

);

console.log(

"Login Routes Loaded"

);

console.log(

"AI Routes Loaded"

);

console.log(

"PDF Routes Loaded"

);

console.log(

"Note Routes Loaded"

);

console.log(

"Flashcard Routes Loaded"

);

console.log(

"Quiz Routes Loaded"

);

console.log(

"Quiz Result Routes Loaded"

);

/* API Routes */

app.use(

"/api/auth",

authRoutes

);

app.use(

"/api/auth",

loginRoutes

);

app.use(

"/api/ai",

aiRoutes

);

app.use(

"/api/pdf",

pdfRoutes

);

app.use(

"/api/notes",

noteRoutes

);

app.use(

"/api/flashcards",

flashcardRoutes

);

app.use(

"/api/quiz",

quizRoutes

);

app.use(

"/api/quiz-results",

quizResultRoutes

);

/* MongoDB Connection */

mongoose.connect(

process.env.MONGO_URI

)

.then(()=>{

console.log(

"MongoDB Connected"

);

})

.catch((err)=>{

console.log(

"MongoDB Error:",

err

);

});

/* Test Routes */

app.get(

"/",

(req,res)=>{

res.send(

"AI Study Companion Backend Running"

);

}

);

app.get(

"/test",

(req,res)=>{

res.json({

message:

"Backend Working"

});

}

);

/* Server */

const PORT =

process.env.PORT

||

5000;

app.listen(

PORT,

()=>{

console.log(

`Server running on ${PORT}`

);

}

);