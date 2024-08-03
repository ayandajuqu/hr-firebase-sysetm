// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyAetczNGbBCj28IDyP4KPPgAPZoUA_3nBs",
  authDomain: "hr-system-921be.firebaseapp.com",
  projectId: "hr-system-921be",
  storageBucket: "hr-system-921be.appspot.com",
  messagingSenderId: "224875971041",
  appId: "1:224875971041:web:cdb265ad3408af49d652a0",
  measurementId: "G-PYTXQ2VY9R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
