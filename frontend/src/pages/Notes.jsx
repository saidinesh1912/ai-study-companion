import jsPDF from "jspdf";

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

import "../styles/Notes.css";

function Notes(){

const [subject,
setSubject]=
useState("Java");

const [technique,
setTechnique]=
useState("Balanced");

const [pdfs,
setPdfs]=
useState([]);

const [selectedPdf,
setSelectedPdf]=
useState("");

const [notes,
setNotes]=
useState([]);

const [expanded,
setExpanded]=
useState(null);

const [openSubject,
setOpenSubject]=
useState(null);

const [loading,
setLoading]=
useState(false);

const subjects=[

"Java",
"DSA",
"DBMS",
"Web Dev",
"OS",
"CN"

];

useEffect(()=>{

loadPDFs();

loadNotes();

},[]);

const loadPDFs=
async()=>{

try{

const user=
auth.currentUser;

if(!user)
return;

const res=

await axios.get(

`https://ai-study-companion-9tt2.onrender.com/api/pdf/${user.uid}`

);

setPdfs(

res.data

);

}

catch(error){

console.log(error);

}

};

const loadNotes=
async()=>{

try{

const user=
auth.currentUser;

if(!user)
return;

const res=

await axios.get(

`https://ai-study-companion-9tt2.onrender.com/api/notes/${user.uid}`

);

setNotes(

res.data

);

}

catch(error){

console.log(error);

}

};

const generateNotes=
async()=>{

try{

const user=
auth.currentUser;

if(
!user ||
!selectedPdf
){

alert(

"Select PDF"

);

return;

}

setLoading(true);

const pdf=

pdfs.find(

(p)=>

p._id===selectedPdf

);

await axios.post(

"https://ai-study-companion-9tt2.onrender.com/api/notes/generate",

{

userId:

user.uid,

subject,

title:

pdf.fileName,

technique,

content:

pdf.content

}

);

alert(

"Notes Generated"

);

loadNotes();

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

const copyNotes=
(text)=>{

navigator.clipboard.writeText(

text

);

alert(

"Copied"

);

};

const downloadPDF=
(note)=>{

const doc=
new jsPDF();

doc.setFontSize(20);

doc.text(

note.title,

10,
20

);

doc.setFontSize(12);

const lines=

doc.splitTextToSize(

note.notes,

180

);

doc.text(

lines,

10,
35

);

doc.save(

`${note.title}.pdf`

);

};

const grouped={};

notes.forEach(

(note)=>{

if(

!grouped[
note.subject
]

){

grouped[
note.subject
]=[];

}

grouped[
note.subject
].push(note);

}

);

return(

<div className="notes-page">

<h1>

Notes Generator

</h1>

<div className="notes-top">

<select

value={subject}

onChange={(e)=>{

setSubject(

e.target.value

);

setSelectedPdf("");

}}

>

{

subjects.map(

(sub)=>(

<option

key={sub}

value={sub}

>

{sub}

</option>

)

)

}

</select>

<select

value={selectedPdf}

onChange={(e)=>{

setSelectedPdf(

e.target.value

);

}}

>

<option value="">

Select PDF

</option>

{

pdfs

.filter(

(pdf)=>

pdf.subject===subject

)

.map(

(pdf)=>(

<option

key={pdf._id}

value={pdf._id}

>

{pdf.fileName}

</option>

)

)

}

</select>

<select

value={technique}

onChange={(e)=>{

setTechnique(

e.target.value

);

}}

>

<option value="Balanced">

Balanced Summary

</option>

<option value="Feynman">

Feynman Technique

</option>

</select>

<button

onClick={generateNotes}

disabled={loading}

>

{

loading

?

"Generating..."

:

"Generate Notes"

}

</button>

</div>

<div className="notes-container">

{

Object.keys(

grouped

).length===0

?

(

<div className="empty-notes">

No Notes Generated Yet

</div>

)

:

(

Object.keys(

grouped

)

.map(

(sub)=>(

<div

key={sub}

className="subject-notes"

>

<div

className="subject-header"

onClick={()=>{

setOpenSubject(

openSubject===sub

?

null

:

sub

);

}}

>

<h2>

{sub}

</h2>

<span>

{

grouped[sub].length

}

Notes

{

openSubject===sub

?

" ▲"

:

" ▼"

}

</span>

</div>

{

openSubject===sub &&

grouped[sub]

.map(

(note)=>(

<div

key={note._id}

className="note-card"

>

<div className="note-header">

<h3>

{note.title}

</h3>

<span className="technique-tag">

{note.technique}

</span>

</div>

<p>

{

note.notes.slice(

0,
120

)

}...

</p>

<div className="note-actions">

<button

onClick={()=>{

setExpanded(

expanded===note._id

?

null

:

note._id

);

}}

>

{

expanded===note._id

?

"Hide"

:

"Expand"

}

</button>

<button

onClick={()=>{

copyNotes(

note.notes

);

}}

>

Copy

</button>

<button

onClick={()=>{

downloadPDF(

note

);

}}

>

Download PDF

</button>

</div>

{

expanded===note._id

&&

(

<div className="full-note">

<p>

{note.notes}

</p>

<div className="note-footer">

<p>

Technique:

{note.technique}

</p>

<p>

{

new Date(

note.createdAt

)

.toLocaleString()

}

</p>

</div>

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

)

}

</div>

</div>

);

}

export default Notes;