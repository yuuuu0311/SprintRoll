import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD47I7lV3NBKsqnYSIMTKf64HtPpi5sBfo",
    authDomain: "sprintroll-9c8c2.firebaseapp.com",
    projectId: "sprintroll-9c8c2",
    storageBucket: "sprintroll-9c8c2.appspot.com",
    messagingSenderId: "772872341958",
    appId: "1:772872341958:web:b21f99865028bf39c48ac7",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };