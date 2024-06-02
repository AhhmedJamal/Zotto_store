import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJdwD5lyUBpnoaLhjXo6mvlV8tEUK74WU",
  authDomain: "auth-8c122.firebaseapp.com",
  projectId: "auth-8c122",
  storageBucket: "auth-8c122.appspot.com",
  messagingSenderId: "286879138829",
  appId: "1:286879138829:web:f17a4cacd87ea2e7970144",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { app, db, auth, googleProvider, facebookProvider };
