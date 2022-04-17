// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7BXsFTRET1dWCMT9Cot79gY_iOBJotIw",
  authDomain: "crud-firebase-prueba-d1b70.firebaseapp.com",
  databaseURL: "https://crud-firebase-prueba-d1b70-default-rtdb.firebaseio.com",
  projectId: "crud-firebase-prueba-d1b70",
  storageBucket: "crud-firebase-prueba-d1b70.appspot.com",
  messagingSenderId: "18762588822",
  appId: "1:18762588822:web:d4d95dea7e8e8c33f798b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage(app);
export default app;