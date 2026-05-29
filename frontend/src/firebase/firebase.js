import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCxIE6sCbktUxDXOMe-Vcqbxuprra9xvwM",
  authDomain: "ai-study-companion-569f3.firebaseapp.com",
  projectId: "ai-study-companion-569f3",
  storageBucket: "ai-study-companion-569f3.firebasestorage.app",
  messagingSenderId: "957992726768",
  appId: "1:957992726768:web:d8269ce29ea94a24995235",
  measurementId: "G-248VZ95M0Q"
};

const app = initializeApp(
firebaseConfig
);

export const auth =
getAuth(app);