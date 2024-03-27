import {
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
    NextOrObserver,
} from 'firebase/auth';
import {auth} from "../firebase-config";
import { User } from "firebase/auth";
export const useAuthentication = () => {
     const signInUser = async (
        email: string,
        password: string
    ) => {
        if (!email && !password) return;

        return await signInWithEmailAndPassword(auth, email, password)
    }

     const userStateListener = (callback:NextOrObserver<User>) => {
        return onAuthStateChanged(auth, callback)
    }

     const signOutUser = async () => await signOut(auth);

    return {
        signInUser,
        signOutUser,
        userStateListener,
    }
}