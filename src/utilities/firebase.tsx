import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// const apiKey =

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
};

console.log(1);

console.log(firebaseConfig);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, app, firebaseConfig };
