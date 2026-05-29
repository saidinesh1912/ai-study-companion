import {

BrowserRouter,
Routes,
Route,
Navigate

}

from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import QuizReview from "./pages/QuizReview";
import Notes from "./pages/Notes";
import PdfUpload from "./pages/PdfUpload";
import Flashcards from "./pages/Flashcards";
import Quiz from "./pages/Quiz";
import History from "./pages/History";
import Profile from "./pages/Profile";

function App(){

return(

<BrowserRouter>

<Routes>

{/* Auth */}

<Route

path="/"

element={<Login/>}

/>

<Route

path="/signup"

element={<Signup/>}

/>

{/* Dashboard */}

<Route

path="/dashboard"

element={<Dashboard/>}

/>

{/* Notes */}

<Route

path="/notes"

element={<Notes/>}

/>

{/* PDF Upload */}

<Route

path="/pdf"

element={<PdfUpload/>}

/>

{/* Flashcards */}

<Route

path="/flashcards"

element={<Flashcards/>}

/>

{/* Quiz */}

<Route

path="/quiz"

element={<Quiz/>}

/>

{/* Quiz Review */}

<Route

path="/quiz-review/:id"

element={<QuizReview/>}

/>

{/* History */}

<Route

path="/history"

element={<History/>}

/>

{/* Profile */}

<Route

path="/profile"

element={<Profile/>}

/>

{/* Redirect Unknown Routes */}

<Route

path="*"

element={

<Navigate

to="/dashboard"

/>

}

/>

</Routes>

</BrowserRouter>

);

}

export default App;