import {

useEffect,
useState

}

from "react";

import axios from "axios";

import {

useParams,
useNavigate

}

from "react-router-dom";

import "../styles/QuizReview.css";

function QuizReview(){

const { id } =
useParams();

const navigate =
useNavigate();

const [quiz,
setQuiz]=
useState(null);

const [loading,
setLoading]=
useState(true);

useEffect(()=>{

loadQuiz();

},[]);

const loadQuiz=
async()=>{

try{

const res=

await axios.get(

`http://localhost:5000/api/quiz-results/review/${id}`

);

setQuiz(

res.data

);

}

catch(error){

console.log(error);

}

finally{

setLoading(false);

}

};

if(loading){

return(

<div className="review-page">

<h1>

Loading Review...

</h1>

</div>

);

}

if(!quiz){

return(

<div className="review-page">

<h1>

Quiz Not Found

</h1>

</div>

);

}

return(

<div className="review-page">

<div className="review-header">

<h1>

{quiz.subject} Quiz Review

</h1>

<p>

{quiz.topic}

</p>

<div className="review-stats">

<div className="stat-box">

<h2>

{quiz.score}/
{quiz.totalQuestions}

</h2>

<span>

Score

</span>

</div>

<div className="stat-box">

<h2>

{quiz.accuracy}%

</h2>

<span>

Accuracy

</span>

</div>

<div className="stat-box">

<h2>

{

new Date(

quiz.createdAt

)

.toLocaleDateString()

}

</h2>

<span>

Date

</span>

</div>

</div>

<button

className="back-btn"

onClick={()=>{

navigate("/quiz");

}}

>

← Back to Quiz

</button>

</div>

<div className="answers-section">

{

quiz.answers.map(

(answer,index)=>(

<div

key={index}

className="answer-card"

>

<div className="answer-top">

<h2>

Q{index+1}

</h2>

<span className={

answer.isCorrect

?

"correct-badge"

:

"wrong-badge"

}

>

{

answer.isCorrect

?

"Correct"

:

"Wrong"

}

</span>

</div>

<h3>

{answer.question}

</h3>

<div className="answer-details">

<p className="your-answer">

Your Answer:

<span>

{answer.selected}

</span>

</p>

<p className="correct-answer-text">

Correct Answer:

<span>

{answer.correct}

</span>

</p>

<p className="explanation-text">

Explanation:

<span>

{answer.explanation}

</span>

</p>

</div>

</div>

)

)

}

</div>

</div>

);

}

export default QuizReview;