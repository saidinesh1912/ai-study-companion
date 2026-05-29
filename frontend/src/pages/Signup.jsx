import { useState } from "react";

import {

createUserWithEmailAndPassword,

GoogleAuthProvider,

signInWithPopup

} from "firebase/auth";

import { auth }

from "../firebase/firebase";

import {

useNavigate,

Link

}

from "react-router-dom";

import "../styles/Auth.css";

function Signup(){

const [name,setName]=
useState("");

const [email,setEmail]=
useState("");

const [password,setPassword]=
useState("");

const navigate=
useNavigate();

const provider=
new GoogleAuthProvider();

const handleSignup=
async()=>{

try{

await createUserWithEmailAndPassword(

auth,

email,

password

);

alert(
"Signup Successful"
);

navigate("/");

}

catch(error){

alert(
error.message
);

}

};

const handleGoogle=
async()=>{

try{

await signInWithPopup(

auth,

provider

);

navigate(
"/dashboard"
);

}

catch(error){

alert(
error.message
);

}

};

return(

<div className="auth-container">

<h1 className="auth-title">

Create Account

</h1>

<p className="auth-sub">

Start your AI Study Companion journey

</p>

<input

className="auth-input"

placeholder="Enter Name"

value={name}

onChange={(e)=>

setName(
e.target.value
)

}

/>

<input

className="auth-input"

placeholder="Enter Email"

value={email}

onChange={(e)=>

setEmail(
e.target.value
)

}

/>

<input

className="auth-input"

type="password"

placeholder="Create Password"

value={password}

onChange={(e)=>

setPassword(
e.target.value
)

}

/>

<button

className=

"auth-btn signup-btn"

onClick=

{handleSignup}

>

Signup

</button>

<div className="divider">

<span>

OR

</span>

</div>

<button

className="google-btn"

onClick={handleGoogle}

>

<img

className="google-icon"

src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"

alt="Google"

/>

<span>

Continue with Google

</span>

</button>

<p>

Already have an account?

<Link

className="link"

to="/"

>

Login

</Link>

</p>

</div>

);

}

export default Signup;