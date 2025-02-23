import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVomqLQG_w-6paYhhoyzOqknWb9Im5oQQ",
  authDomain: "iit-mandi-campus-marketplace.firebaseapp.com",
  projectId: "iit-mandi-campus-marketplace",
  storageBucket: "iit-mandi-campus-marketplace.firebasestorage.app",
  messagingSenderId: "887784535444",
  appId: "1:887784535444:web:e3e01e0fe17c347a3ccb81",
  measurementId: "G-F3TBJVW5Y7"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

