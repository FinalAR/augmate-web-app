import {  BrowserRouter as Router, RouterProvider, useRoutes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ThemeRoutes from "./routes/Router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { auth } from "./firebase";
import { loginUser, setLoading } from "./slices/userSlice";
import router from "./routes/Router";

const App = () => {
  // const routing = useRoutes(Themeroutes);
  return (
    <div className="dark">
      <ToastContainer />
        <RouterProvider router={router}/>
    </div>
  )
};

export default App;
