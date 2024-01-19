import { useNavigate, Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { loginUser, setLoading } from "../slices/userSlice";

export const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAutherized = useSelector((state) => state.data.user.isAuthorized);
    // useEffect(() => {
    //     auth.onAuthStateChanged((authUser) =>  {
    //         if (authUser) {
    //             console.log("User loggged");
    //             console.log(authUser);
    //             localStorage.setItem('isAuthorized', true)
    //         } else {
    //             localStorage.setItem('isAuthorized', false)
    //         }
    //     });
    // },[]);
    if (isAutherized) {
        console.log("Auth status: true");
        return children;
    } else {
        console.log("Auth status: false");
        return <Navigate to='/auth' />;
    }
};


