import { initializeApp } from "firebase/app";
import {
	getAuth,
} from 'firebase/auth';
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyDwN6CdrGmY7ZPFfiA9esD86cqKHd3Vduo",
	authDomain: "school-22268.firebaseapp.com",
	projectId: "school-22268",
	storageBucket: "school-22268.appspot.com",
	messagingSenderId: "307296513832",
	appId: "1:307296513832:web:644d5beac0a3cb3b5cea1d",
	measurementId: "G-9BJ2BK5N4F",
};

export const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {experimentalForceLongPolling: true});
export const auth = getAuth();
export const storage = getStorage();