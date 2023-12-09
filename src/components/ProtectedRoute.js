import {useNavigate , Outlet} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { loginUser, setLoading } from "../slices/userSlice";

export const ProtectedRoute = ({children}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isUserLogged,setIsUserLogged] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((authUser) =>  {
            if (authUser) {
                console.log("User loggged");
                console.log(authUser);
                setIsUserLogged(true)
                dispatch(
                    loginUser({
                        uid: authUser.uid,
                        username: authUser.displayName,
                        email: authUser.email,
                    })
                );
                dispatch(setLoading(false));
            } else {
                dispatch(setLoading(false));
                navigate('/auth')
                console.log("User is not logged in");
            }
        });
    }, []);
    return children;
};


