import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import {useAuthentication} from "./useAuthentication";

export const useUser = () => {
    const {currentUser} = useContext(AuthContext);
    const {userStateListener} = useAuthentication();
    const [user, setUser] = useState(currentUser);

    useEffect(() => {
        userStateListener(user => setUser(user))
    }, [userStateListener])

    return user;
}