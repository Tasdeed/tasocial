// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLXUQSBD0H0dCJBAIWZw22wMVbVk3dcd4",
  authDomain: "social-app-d757f.firebaseapp.com",
  projectId: "social-app-d757f",
  storageBucket: "social-app-d757f.appspot.com",
  messagingSenderId: "602736765580",
  appId: "1:602736765580:web:3b754f43fe517addcc29a9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
