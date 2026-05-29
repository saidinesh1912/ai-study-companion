import {
useState,
useEffect
}
from "react";

import axios from "axios";

import {
auth
}
from "../firebase/firebase";

import "../styles/PdfUpload.css";

function PdfUpload(){

const [pdf,setPdf]=
useState(null);

const [pdfs,setPdfs]=
useState([]);

const [loading,setLoading]=
useState(false);

const [subject,setSubject]=
useState("Java");

const subjects=[

"Java",
"DSA",
"DBMS",
"Web Dev",
"OS",
"CN"

];

const uploadPDF=
async()=>{

if(!pdf){

alert(
"Please choose a PDF"
);

return;

}

try{

setLoading(true);

const formData=
new FormData();

formData.append(
"pdf",
pdf
);

formData.append(
"userId",
auth.currentUser.uid
);

formData.append(
"subject",
subject
);

await axios.post(
"http://localhost:5000/api/pdf/upload",
formData
);

alert(
"PDF Uploaded Successfully"
);

loadPDFs();

setPdf(null);

document
.getElementById(
"pdfInput"
)
.value="";

}

catch(error){

console.log(error);

alert(
"Upload Failed"
);

}

finally{

setLoading(false);

}

};

const loadPDFs=
async()=>{

try{

const res=

await axios.get(

`http://localhost:5000/api/pdf/${auth.currentUser.uid}`

);

setPdfs(
res.data
);

}

catch(error){

console.log(
error
);

}

};

useEffect(()=>{

if(
auth.currentUser
){

loadPDFs();

}

},[]);

return(

<div className="pdf-page">

<div className="knowledge-header">

<h1>

📚 Knowledge Hub

</h1>

<p>

Manage and organize all your study materials

</p>

</div>

<div className="upload-toolbar">

<select

className="subject-select"

value={subject}

onChange={(e)=>{

setSubject(
e.target.value
);

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

<label

htmlFor="pdfInput"

className="choose-btn"

>

📄 Choose PDF

</label>

<input

id="pdfInput"

type="file"

accept=".pdf"

onChange={(e)=>{

setPdf(
e.target.files[0]
);

}}

/>

<button

className="upload-btn"

onClick={uploadPDF}

disabled={loading}

>

{

loading

?

"Uploading..."

:

"🚀 Upload PDF"

}

</button>

</div>

{

pdf &&

<div className="selected-file">

📎 {pdf.name}

</div>

}

<h2 className="section-title">

Uploaded PDFs

</h2>

<div className="pdf-list">

{

pdfs.length===0

?

(

<p className="empty">

No PDFs uploaded yet

</p>

)

:

(

pdfs.map(

(pdf)=>(

<div

key={pdf._id}

className="pdf-card"

>

<h3>

📄 {pdf.fileName}

</h3>

<div className="pdf-info">

<p>

Subject: {pdf.subject}

</p>

<p>

Uploaded: {

new Date(
pdf.uploadedAt
)
.toLocaleString()

}

</p>

</div>

</div>

)

)

)

}

</div>

</div>

);

}

export default PdfUpload;