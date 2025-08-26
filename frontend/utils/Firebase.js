import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";


const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  apiKey: "AIzaSyBqoKAGJyDjN6mj7JqSFsjAHLOSecmNnQ0",
  authDomain: "loginonecart-ca836.firebaseapp.com",
  projectId: "loginonecart-ca836",
  storageBucket: "loginonecart-ca836.firebasestorage.app",
  messagingSenderId: "313311728490",
  appId: "1:313311728490:web:acee532dec887faeec0b13"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider}