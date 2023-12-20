import {  BrowserRouter as Router, useRoutes } from "react-router-dom";
import ThemeRoutes from "./routes/Router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { auth } from "./firebase";
import { loginUser, setLoading } from "./slices/userSlice";

const App = () => {
  // const routing = useRoutes(Themeroutes);
  return (
    <div className="dark">
        <Router><ThemeRoutes/></Router>
    </div>
  )
};

export default App;
