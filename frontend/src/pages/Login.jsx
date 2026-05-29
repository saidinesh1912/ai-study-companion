import { useState } from "react";

import {

signInWithEmailAndPassword,

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

function Login(){

const [email,setEmail]=
useState("");

const [password,setPassword]=
useState("");

const navigate=
useNavigate();

const provider=
new GoogleAuthProvider();

const handleLogin=
async()=>{

try{

await signInWithEmailAndPassword(

auth,

email,

password

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

Welcome Back

</h1>

<p className="auth-sub">

Login to your AI Study Companion

</p>

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

placeholder="Enter Password"

value={password}

onChange={(e)=>

setPassword(
e.target.value
)

}

/>

<button

className=

"auth-btn login-btn"

onClick=

{handleLogin}

>

Login

</button>

<div className="divider">

<span>

OR

</span>

</div>

<button

className=

"google-btn"

onClick=

{handleGoogle}

>

<img

className="google-icon"

src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"

alt="Google"

/>

<span>

Sign in with Google

</span>

</button>

<p>

Don't have an account?

<Link

className="link"

to="/signup"

>

Signup

</Link>

</p>

</div>

);

}

export default Login;