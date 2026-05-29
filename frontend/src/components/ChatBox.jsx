import {useState} from "react";
import axios from "axios";

function ChatBox(){

const[
message,
setMessage

]=useState("");

const[
response,
setResponse

]=useState("");

const[
subject,
setSubject

]=useState("DSA");

const sendMessage=
async()=>{

try{

const res=
await axios.post(

"http://localhost:5000/api/ai/chat",

{

message,
subject

}

);

setResponse(

res.data.reply

);

}

catch(error){

alert(

"AI Error"

);

}

};

return(

<div>

<select

value={subject}

onChange={(e)=>

setSubject(
e.target.value
)

}

>

<option>DSA</option>

<option>Java</option>

<option>DBMS</option>

<option>Web Development</option>

<option>Operating System</option>

<option>Computer Networks</option>

<option>Software Engineering</option>

<option>Compiler Design</option>

<option>Data Science</option>

<option>Machine Learning</option>

<option>Artificial Intelligence</option>

<option>Python</option>

<option>JavaScript</option>

<option>React</option>

<option>Node.js</option>

<option>HTML</option>

<option>CSS</option>

<option>MongoDB</option>

<option>Aptitude</option>

<option>Interview Preparation</option>

<option>System Design</option>

<option>Cyber Security</option>

<option>Cloud Computing</option>

<option>DevOps</option>

<option>Project Help</option>

</select>

<br/><br/>

<input

value={message}

placeholder=
"Ask question"

onChange={(e)=>

setMessage(
e.target.value
)

}

/>

<button
onClick={
sendMessage
}
>

Ask AI

</button>

<h3>

{response}

</h3>

</div>

);

}

export default ChatBox;