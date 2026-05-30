import {

useEffect,
useState

}

from "react";

import {

useNavigate

}

from "react-router-dom";

import {

auth

}

from "../firebase/firebase";

import {

signOut,
deleteUser

}

from "firebase/auth";

import axios from "axios";

import "../styles/Profile.css";

function Profile(){

const navigate =
useNavigate();

const [quizCount,
setQuizCount]=
useState(0);

const [notesCount,
setNotesCount]=
useState(0);

const [flashcardCount,
setFlashcardCount]=
useState(0);

const [streak,
setStreak]=
useState(5);

const [profileImage,
setProfileImage]=
useState(

localStorage.getItem(

"profileImage"

)

||

""

);

const [darkMode,
setDarkMode]=
useState(

localStorage.getItem(

"theme"

)!=="light"

);

const user =
auth.currentUser;

/* APPLY THEME */

useEffect(()=>{

if(darkMode){

document.body.classList.remove(

"light-mode"

);

localStorage.setItem(

"theme",

"dark"

);

}

else{

document.body.classList.add(

"light-mode"

);

localStorage.setItem(

"theme",

"light"

);

}

},[darkMode]);

/* LOAD STATS */

useEffect(()=>{

loadStats();

},[]);

const loadStats =
async()=>{

try{

if(!user)
return;

/* NOTES */

const notesRes =

await axios.get(

`https://ai-study-companion-9tt2.onrender.com/api/notes/${user.uid}`

);

setNotesCount(

notesRes.data.length

);

/* FLASHCARDS */

const flashRes =

await axios.get(

`https://ai-study-companion-9tt2.onrender.com/api/flashcards/${user.uid}`

);

setFlashcardCount(

flashRes.data.length

);

/* QUIZZES */

const quizRes =

await axios.get(

`https://ai-study-companion-9tt2.onrender.com/api/quiz-results/${user.uid}`

);

setQuizCount(

quizRes.data.length

);

}

catch(error){

console.log(error);

}

};

/* IMAGE UPLOAD */

const handleImageUpload =
(e)=>{

const file =
e.target.files[0];

if(!file)
return;

const reader =
new FileReader();

reader.onloadend=()=>{

setProfileImage(

reader.result

);

localStorage.setItem(

"profileImage",

reader.result

);

};

reader.readAsDataURL(file);

};

/* REMOVE PHOTO */

const removePhoto =
()=>{

setProfileImage("");

localStorage.removeItem(

"profileImage"

);

};

/* LOGOUT */

const logout =
async()=>{

try{

await signOut(auth);

navigate("/");

}

catch(error){

console.log(error);

}

};
const deleteAccount =
async()=>{

const confirmDelete =
window.confirm(
"Are you sure you want to permanently delete your account?"
);

if(!confirmDelete)
return;

try{

await deleteUser(
auth.currentUser
);

localStorage.clear();

alert(
"Account deleted successfully"
);

navigate("/");

}

catch(error){

console.log(error);

alert(
error.message
);

}

};

return(

<div className="profile-page">

{/* HEADER */}

<div className="profile-header-card">

<div className="profile-left">

{

profileImage

?

(

<img

src={profileImage}

alt="profile"

className="profile-avatar"

/>

)

:

(

<div className="profile-avatar default-avatar">

{

user?.email?.charAt(0)

.toUpperCase()

}

</div>

)

}

<div className="profile-info">

<h1>

Welcome Back 👋

</h1>

<p>

{user?.email}

</p>

<p>

Joined:

{

user?.metadata?.creationTime

?

new Date(

user.metadata.creationTime

)

.toLocaleDateString()

:

"Recently"

}

</p>

<div className="upload-row">

<input

id="profileInput"

type="file"

accept="image/*"

onChange={handleImageUpload}

hidden

/>

<button

className="upload-btn"

onClick={()=>{

document

.getElementById(

"profileInput"

)

.click();

}}

>

Upload Profile Picture

</button>

<button

className="remove-btn"

onClick={removePhoto}

>

Remove Photo

</button>

</div>

</div>

</div>

</div>

{/* GRID */}

<div className="profile-grid">

{/* STATS */}

<div className="profile-card">

<h2>

📊 Study Statistics

</h2>

<div className="stats-grid">

<div className="stat-item">

<h3>

{quizCount}

</h3>

<p>

Total Quizzes

</p>

</div>

<div className="stat-item">

<h3>

{notesCount}

</h3>

<p>

Total Notes

</p>

</div>

<div className="stat-item">

<h3>

{flashcardCount}

</h3>

<p>

Flashcards

</p>

</div>

<div className="stat-item streak">

<h3>

{streak} 🔥

</h3>

<p>

Day Streak

</p>

</div>

</div>

</div>

{/* PREFERENCES */}

<div className="profile-card">

<h2>

⚙ App Preferences

</h2>

<div className="pref-box">

<h3>

AI Assistant

</h3>

<p>

AI-powered study assistance enabled

</p>

</div>

{/* THEME TOGGLE */}

<div className="pref-box">

<h3>

Theme Mode

</h3>

<div className="theme-toggle">

<span>

{

darkMode

?

"🌙 Dark"

:

"☀ Light"

}

</span>

<label className="switch">

<input

type="checkbox"

checked={darkMode}

onChange={()=>{

setDarkMode(

!darkMode

);

}}

/>

<span className="slider"></span>

</label>

</div>

</div>

<div className="pref-box">

<h3>

App Version

</h3>

<p>

AI Study Companion v1.0

</p>

</div>

<button

className="logout-btn"

onClick={logout}

>

Logout

</button>

<button

className="delete-btn"

onClick={deleteAccount}

>

Delete Account

</button>

</div>

</div>

</div>

);

}

export default Profile;