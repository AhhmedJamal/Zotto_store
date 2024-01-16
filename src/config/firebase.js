import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAJdwD5lyUBpnoaLhjXo6mvlV8tEUK74WU",
  authDomain: "auth-8c122.firebaseapp.com",
  projectId: "auth-8c122",
  storageBucket: "auth-8c122.appspot.com",
  messagingSenderId: "286879138829",
  appId: "1:286879138829:web:43b4417e67c6e6ff970144",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
