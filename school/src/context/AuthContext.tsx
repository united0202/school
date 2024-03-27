import {User} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {createContext, useState, useEffect, ReactNode} from "react";
import {useAuthentication} from "../hooks/useAuthentication";
import firebase from "firebase/compat";

interface Props {
    children?: ReactNode
}

export const AuthContext = createContext({
    currentUser: {} as User | null,
    setCurrentUser: (_user: User) => {
    },
    signOut: () => {
    }
});

export const AuthProvider = ({children}: Props) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    // const navigate = useNavigate()
    const {signOutUser, userStateListener} = useAuthentication();

    useEffect(() => {
        const unsubscribe = userStateListener((user) => {
            if (user) {
                setCurrentUser(user)
            }
        });
        return unsubscribe
    }, [setCurrentUser]);

    // As soon as setting the current user to null,
    // the user will be redirected to the home page.
    const signOut = () => {
        signOutUser();
        setCurrentUser(null);
        // navigate('/');
    }

    const value = {
        currentUser,
        setCurrentUser,
        signOut
    }

    return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>;
}