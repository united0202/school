import {
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
    NextOrObserver,
} from 'firebase/auth';
import {auth} from "../firebase-config";
import { User } from "firebase/auth";
export const useUser = () => {
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

    // const usersCollectionRef = collection(db, "user");
    // const getUsers = async (): Promise<User[]> => {
    //     const users: User[] = [];
    //     const userCollection = await getDocs(usersCollectionRef);
    //    userCollection.docs.map(doc => {
    //         const data = doc.data();
    //         users.push({
    //             nickname: data.nickname,
    //             password: data.password
    //         })
    //     })
    //
    //     return users;
    // }

    return {
        signInUser,
        signOutUser,
        userStateListener,
    }
}