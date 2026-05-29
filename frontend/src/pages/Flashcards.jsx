import {

useEffect,
useState

}

from "react";

import axios from "axios";

import {

auth

}

from "../firebase/firebase";

import "../styles/Flashcards.css";

function Flashcards(){

const [notes,
setNotes]=
useState([]);

const [flashcards,
setFlashcards]=
useState([]);

const [selectedNote,
setSelectedNote]=
useState("");

const [loading,
setLoading]=
useState(false);

const [flipped,
setFlipped]=
useState(null);

const [openSubject,
setOpenSubject]=
useState(null);

const [openTopic,
setOpenTopic]=
useState(null);

useEffect(()=>{

loadNotes();

loadFlashcards();

},[]);

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

const loadFlashcards=
async()=>{

try{

const user=
auth.currentUser;

if(!user)
return;

const res=

await axios.get(

`http://localhost:5000/api/flashcards/${user.uid}`

);

setFlashcards(

res.data

);

}

catch(error){

console.log(error);

}

};

const generateFlashcards=
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

await axios.post(

"http://localhost:5000/api/flashcards/generate",

{

userId:

auth.currentUser.uid,

subject:

note.subject,

topic:

note.title,

notes:

note.notes

}

);

alert(

"Flashcards Generated"

);

loadFlashcards();

}

catch(error){

console.log(error);

alert(

"Generation Failed"

);

}

finally{

setLoading(false);

}

};

/* Group Subject → Topic */

const grouped={};

flashcards.forEach(

(card)=>{

if(

!grouped[
card.subject
]

){

grouped[
card.subject
]={};

}

if(

!grouped[
card.subject
][
card.topic
]

){

grouped[
card.subject
][
card.topic
]=[];

}

grouped[
card.subject
][
card.topic
].push(card);

}

);

return(

<div className="flashcards-page">

<h1>

AI Flashcards

</h1>

<div className="flashcard-top">

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

onClick={generateFlashcards}

disabled={loading}

>

{

loading

?

"Generating..."

:

"Generate Flashcards"

}

</button>

</div>

<div className="flashcards-container">

{

Object.keys(

grouped

).map(

(subject)=>(

<div

key={subject}

className="subject-section"

>

<div

className={

openSubject===subject

?

"subject-box active"

:

"subject-box"

}

onClick={()=>{

setOpenSubject(

openSubject===subject

?

null

:

subject

);

}}

>

<h2>

{subject}

</h2>

<span>

{

Object.keys(

grouped[subject]

).length

}

Topics

{

openSubject===subject

?

" ▲"

:

" ▼"

}

</span>

</div>

{

openSubject===subject &&

Object.keys(

grouped[subject]

).map(

(topic)=>(

<div

key={topic}

className="topic-section"

>

<div

className={

openTopic===topic

?

"topic-box active"

:

"topic-box"

}

onClick={()=>{

setOpenTopic(

openTopic===topic

?

null

:

topic

);

}}

>

<h3>

{topic}

</h3>

<span>

{

grouped[
subject
][
topic
].length

}

Cards

{

openTopic===topic

?

" ▲"

:

" ▼"

}

</span>

</div>

{

openTopic===topic &&

(

<div className="flashcard-grid">

{

grouped[
subject
][
topic
]

.map(

(card)=>(

<div

key={card._id}

className={

flipped===card._id

?

"flashcard flipped"

:

"flashcard"

}

onClick={()=>{

setFlipped(

flipped===card._id

?

null

:

card._id

);

}}

>

<div className="flashcard-inner">

<div className="flashcard-front">

<h3>

{card.question}

</h3>

<p>

Tap to Flip

</p>

</div>

<div className="flashcard-back">

<h3>

{card.answer}

</h3>

<span>

{card.difficulty}

</span>

</div>

</div>

</div>

)

)

}

</div>

)

}

</div>

)

)

}

</div>

)

)

}

</div>

</div>

);

}

export default Flashcards;