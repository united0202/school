import {initializeApp} from "firebase/app";
import {getFirestore} from "@firebase/firestore";
import {
    getAuth,
} from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyDwN6CdrGmY7ZPFfiA9esD86cqKHd3Vduo",
    authDomain: "school-22268.firebaseapp.com",
    projectId: "school-22268",
    storageBucket: "school-22268.appspot.com",
    messagingSenderId: "307296513832",
    appId: "1:307296513832:web:644d5beac0a3cb3b5cea1d",
    measurementId: "G-9BJ2BK5N4F"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();