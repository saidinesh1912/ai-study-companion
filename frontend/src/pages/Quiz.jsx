import {

useEffect,
useState

}

from "react";

import axios from "axios";

import {

useNavigate

}

from "react-router-dom";

import {

auth

}

from "../firebase/firebase";

import "../styles/Quiz.css";

function Quiz(){

const navigate =
useNavigate();

const [notes,
setNotes]=
useState([]);

const [selectedNote,
setSelectedNote]=
useState("");

const [quiz,
setQuiz]=
useState([]);

const [currentQuestion,
setCurrentQuestion]=
useState(0);

const [selectedAnswer,
setSelectedAnswer]=
useState("");

const [score,
setScore]=
useState(0);

const [showResult,
setShowResult]=
useState(false);

const [loading,
setLoading]=
useState(false);

const [userAnswers,
setUserAnswers]=
useState([]);

const [quizHistory,
setQuizHistory]=
useState([]);

useEffect(()=>{

loadNotes();

loadQuizHistory();

},[]);

/* Load Notes */

const loadNotes=
async()=>{

try{

const user=
auth.currentUser;

if(!user)
return;

const res=

await axios.get(

`http://localhost:5000/api/notes/${user.uid}`

);

setNotes(

res.data

);

}

catch(error){

console.log(error);

}

};

/* Load Quiz History */

const loadQuizHistory=
async()=>{

try{

const user=
auth.currentUser;

if(!user)
return;

const res=

await axios.get(

`http://localhost:5000/api/quiz-results/${user.uid}`

);

setQuizHistory(

res.data

);

}

catch(error){

console.log(error);

}

};

/* Generate Quiz */

const generateQuiz=
async()=>{

try{

if(!selectedNote){

alert(

"Select Notes"

);

return;

}

setLoading(true);

const note=

notes.find(

(n)=>

n._id===selectedNote

);

const res=

await axios.post(

"http://localhost:5000/api/quiz/generate",

{

subject:

note.subject,

topic:

note.title,

notes:

note.notes

}

);

setQuiz(

res.data.quiz

);

setCurrentQuestion(0);

setScore(0);

setShowResult(false);

setSelectedAnswer("");

setUserAnswers([]);

}

catch(error){

console.log(error);

alert(

"Quiz Generation Failed"

);

}

finally{

setLoading(false);

}

};

/* Handle Next */

const handleNext=
async()=>{

const current=

quiz[currentQuestion];

const isCorrect =

selectedAnswer===

current.correctAnswer;

const updatedAnswers = [

...userAnswers,

{

question:

current.question,

selected:

selectedAnswer,

correct:

current.correctAnswer,

explanation:

current.explanation,

isCorrect

}

];

setUserAnswers(

updatedAnswers

);

let updatedScore = score;

if(isCorrect){

updatedScore = score+1;

setScore(updatedScore);

}

if(

currentQuestion+1 <

quiz.length

){

setCurrentQuestion(

currentQuestion+1

);

setSelectedAnswer("");

}

else{

setShowResult(true);

/* Save Quiz Result */

try{

const note =

notes.find(

(n)=>

n._id===selectedNote

);

await axios.post(

"http://localhost:5000/api/quiz-results/save",

{

userId:

auth.currentUser.uid,

subject:

note.subject,

topic:

note.title,

score:

updatedScore,

totalQuestions:

quiz.length,

accuracy:

Math.round(

(updatedScore/quiz.length)*100

),

answers:

updatedAnswers

}

);

loadQuizHistory();

}

catch(error){

console.log(error);

}

}

};

return(

<div className="quiz-page">

<h1>

AI Quiz Generator

</h1>

<div className="quiz-top">

<select

value={selectedNote}

onChange={(e)=>{

setSelectedNote(

e.target.value

);

}}

>

<option value="">

Select Notes

</option>

{

notes.map(

(note)=>(

<option

key={note._id}

value={note._id}

>

{note.subject} - {note.title}

</option>

)

)

}

</select>

<button

onClick={generateQuiz}

disabled={loading}

>

{

loading

?

"Generating..."

:

"Generate Quiz"

}

</button>

</div>

{

quiz.length>0 &&

!showResult &&

(

<div className="quiz-container">

<div className="quiz-header">

<h2>

Question

{currentQuestion+1}

/

{quiz.length}

</h2>

<span>

Difficulty:

{

quiz[currentQuestion]

.difficulty

}

</span>

</div>

<div className="question-card">

<h3>

{

quiz[currentQuestion]

.question

}

</h3>

<div className="options">

{

quiz[currentQuestion]

.options

.map(

(option,index)=>(

<button

key={index}

className={

selectedAnswer===option

?

"option selected"

:

"option"

}

onClick={()=>{

setSelectedAnswer(

option

);

}}

>

{option}

</button>

)

)

}

</div>

<button

className="next-btn"

onClick={handleNext}

disabled={!selectedAnswer}

>

{

currentQuestion+1===quiz.length

?

"Finish Quiz"

:

"Next Question"

}

</button>

</div>

</div>

)

}



{

showResult &&

(

<div className="result-box">

<h2>

Quiz Completed 🎉

</h2>

<h3>

Score:

{score}

/

{quiz.length}

</h3>

<p>

Accuracy:

{

Math.round(

(score/quiz.length)*100

)

}

%

</p>

<button

onClick={()=>{

setQuiz([]);

setShowResult(false);

setUserAnswers([]);

}}

>

Generate Another Quiz

</button>

</div>

)

}



<div className="quiz-history">

<h2>

Quiz History

</h2>

<div className="history-grid">

{

quizHistory.map(

(item)=>(

<div

key={item._id}

className="history-card"

onClick={()=>{

navigate(

`/quiz-review/${item._id}`

);

}}

>

<h3>

{item.subject}

</h3>

<p>

{item.topic}

</p>

<div className="history-score">

<span>

{item.score}/
{item.totalQuestions}

</span>

<span>

{item.accuracy}%

</span>

</div>

<p className="history-date">

{

new Date(

item.createdAt

)

.toLocaleString()

}

</p>

</div>

)

)

}

</div>

</div>

</div>

);

}

export default Quiz;