import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
// const fbAuthProvider = new FacebookAuthProvider();
const firebaseConfig = {
  apiKey: "AIzaSyBanqVuv9IwIGn20xXl6AJQUiOw9VcyW6Q",
  authDomain: "chat-app-5ee4c.firebaseapp.com",
  databaseURL:
    "https://chat-app-5ee4c-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "chat-app-5ee4c",
  storageBucket: "chat-app-5ee4c.appspot.com",
  messagingSenderId: "107101263881",
  appId: "1:107101263881:web:0780fbead0e31b295640d8",
  measurementId: "G-6Z0MDDDQQE",
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
export { database, ref, push, onValue, auth, googleProvider, facebookProvider };
