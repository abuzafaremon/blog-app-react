import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKGHWdhwAXvb8mf7bagFhlDQ0jQSetkQw",
  authDomain: "blog-app-emon.firebaseapp.com",
  projectId: "blog-app-emon",
  storageBucket: "blog-app-emon.appspot.com",
  messagingSenderId: "855892713595",
  appId: "1:855892713595:web:ebe60a8f9b1c346babc2de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const storage = getStorage(app);
