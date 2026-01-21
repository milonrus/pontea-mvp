import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByhln6E1DyzLFkZvBnQnU2FVQWjsc6kUI",
  authDomain: "pontea-lab-2.firebaseapp.com",
  projectId: "pontea-lab-2",
  storageBucket: "pontea-lab-2.firebasestorage.app",
  messagingSenderId: "459565128634",
  appId: "1:459565128634:web:78579c98109f2cfc285b83"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
