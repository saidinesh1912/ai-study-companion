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

import "../styles/History.css";

function History(){

const [history,
setHistory]=
useState([]);

const [selectedSubject,
setSelectedSubject]=
useState(null);

const [expanded,
setExpanded]=
useState(null);

useEffect(()=>{

loadHistory();

},[]);

const loadHistory=
async()=>{

try{

const user=

auth.currentUser;

if(!user)
return;

const res=

await axios.get(

`https://ai-study-companion-9tt2.onrender.com/api/ai/history/${
user.uid
}`

);

setHistory(

res.data

);

}

catch(error){

console.log(

error

);

}

};

const grouped={};

history.forEach(

(chat)=>{

if(

!grouped[
chat.subject
]

){

grouped[
chat.subject
]=[];

}

grouped[
chat.subject
]

.push(chat);

}

);

return(

<div className="history-page">

<h1>

History

</h1>

{

!selectedSubject

?

(

<div className="subject-grid">

{

Object.keys(

grouped

)

.map(

(subject)=>(

<div

key={subject}

className="subject-card"

onClick={()=>{

setSelectedSubject(

subject

);

}}

>

<h2>

{subject}

</h2>

<p>

{

grouped[
subject
].length

}

Chats

</p>

</div>

)

)

}

</div>

)

:

(

<div>

<button

className="back-btn"

onClick={()=>{

setSelectedSubject(

null

);

}}

>

← Back

</button>

<h2 className="subject-title">

{selectedSubject}

</h2>

{

grouped[
selectedSubject
]

.map(

(chat,index)=>(

<div

key={chat._id}

className="history-card"

>

<h3>

Q:

{

chat.question

}

</h3>

<p>

{

new Date(

chat.createdAt

)

.toLocaleString()

}

</p>

<button

className="expand-btn"

onClick={()=>{

setExpanded(

expanded===index

?

null

:

index

);

}}

>

{

expanded===index

?

"Hide Answer"

:

"Expand Answer"

}

</button>

{

expanded===index

&&

(

<div

className="answer-box"

>

{

chat.answer

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

}

</div>

);

}

export default History;