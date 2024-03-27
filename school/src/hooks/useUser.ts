import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";

export const useUser = () => {
	const {currentUser} = useContext(AuthContext);
	const [user, setUser] = useState(currentUser);

	useEffect(()=> {
		setUser(currentUser);
	}, [currentUser])

	return user;
}