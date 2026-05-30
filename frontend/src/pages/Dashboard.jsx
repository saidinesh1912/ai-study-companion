import { useState } from "react";

import {

FiFileText,
FiHelpCircle,
FiClock,
FiMenu,
FiUser

}

from "react-icons/fi";

import {

useNavigate

}

from "react-router-dom";

import {

auth

}

from "../firebase/firebase";

import "../styles/Dashboard.css";

function Dashboard(){

const navigate=
useNavigate();

const [message,setMessage]=
useState("");

const [aiResponse,
setAiResponse]=
useState("");

const [sidebarOpen,
setSidebarOpen]=
useState(true);

const [selectedSubject,
setSelectedSubject]=
useState("Java");

const [aiState,
setAiState]=
useState(

"💙 AI Ready"

);

const subjects=[

"Java",
"DSA",
"DBMS",
"Web Dev",
"OS",
"CN"

];

const askAI=
async()=>{

if(
!message.trim()
)
return;

try{

setAiState(

"🧠 Thinking..."

);

setAiResponse("");

const user=
auth.currentUser;

if(!user){

setAiState(

"❌ Login Required"

);

return;

}

const res=

await fetch(

"https://ai-study-companion-9tt2.onrender.com/api/ai/chat",

{

method:"POST",

headers:{

"Content-Type":

"application/json"

},

body:

JSON.stringify({

message,

subject:

selectedSubject,

userId:

user.uid

})

}

);

const data=

await res.json();

if(data.error){

throw new Error(

data.error

);

}

setAiResponse(

data.reply

);

setAiState(

"😊 Answer Ready"

);

setMessage("");

}

catch(error){

console.log(error);

setAiState(

"❌ AI Failed"

);

}

};

return(

<div className="dashboard">

<button

className="menu-btn"

onClick={()=>{

setSidebarOpen(

!sidebarOpen

);

}}

>

<FiMenu/>

</button>

<div

className={

sidebarOpen

?

"sidebar"

:

"sidebar closed"

}

>

<button

className="side-btn"

onClick={()=>{

navigate(

"/notes"

);

}}

>

<FiFileText/>

Notes

</button>

<button

className="side-btn"

onClick={()=>{

navigate(

"/pdf"

);

}}

>

📄 PDF Upload

</button>

<button

className="side-btn"

onClick={()=>{

navigate(

"/flashcards"

);

}}

>

🗂 Flashcards

</button>

<button

className="side-btn"

onClick={()=>{

navigate(

"/quiz"

);

}}

>

<FiHelpCircle/>

Quiz

</button>

<button

className="side-btn"

onClick={()=>{

navigate(

"/history"

);

}}

>

<FiClock/>

History

</button>

<button

className="side-btn"

onClick={()=>{

navigate(

"/profile"

);

}}

>

<FiUser/>

Profile

</button>

</div>

<div className={sidebarOpen ? "main" : "main full"}>

<div className="robot-box">

<div className="ai-state">

{aiState}

</div>

<h1>

What will we learn?

</h1>

<p>

Current Subject:

{selectedSubject}

</p>

</div>

<div className="subject-row">

{

subjects.map(

(subject)=>(

<button

key={subject}

className={

selectedSubject===subject

?

"subject-chip active"

:

"subject-chip"

}

onClick={()=>{

setSelectedSubject(

subject

);

}}

>

{subject}

</button>

)

)

}

</div>

<div className="chat-wrapper">

<div className="chat-box">

<input

placeholder={`Ask ${selectedSubject}...`}

value={message}

onChange={(e)=>{

setMessage(

e.target.value

);

setAiState(

"✍️ Taking Notes..."

);

}}

onKeyDown={(e)=>{

if(

e.key==="Enter"

){

askAI();

}

}}

 />

<button

onClick={askAI}

>

Ask AI

</button>

</div>

</div>

{

aiResponse && (

<div

className="ai-answer"

>

<h3>

{selectedSubject}

</h3>

<p>

{aiResponse}

</p>

</div>

)

}

</div>

</div>

);

}

export default Dashboard;