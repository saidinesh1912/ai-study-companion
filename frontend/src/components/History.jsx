import { useEffect, useState } from "react";
import axios from "axios";

function History(){

const [history,setHistory]=useState([]);

const fetchHistory=async()=>{

try{

const res=await axios.get(
"http://localhost:5000/api/ai/history"
);

setHistory(res.data);

}

catch(error){

console.log(error);

}

};

useEffect(()=>{

fetchHistory();

const interval=

setInterval(

fetchHistory,

2000

);

return()=>{

clearInterval(
interval
);

};

},[]);

return(

<div>

<h2>

Recent Chats

</h2>

{

history.length===0?

(

<p>

No chats yet

</p>

)

:

(

history.map(

(chat,index)=>(

<div
key={index}
style={{

border:
"1px solid gray",

padding:
"10px",

margin:
"10px"

}}

>

<h3>

{chat.subject}

</h3>

<p>

Question:

{chat.question}

</p>

<p>

Answer:

{chat.answer}

</p>

</div>

)

)

)

}

</div>

);

}

export default History;