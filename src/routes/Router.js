import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {ProtectedRoute}  from "../components/ProtectedRoute.js";

/****Layouts*****/
const Authenticate = lazy(() => import("../views/ui/Authenticate.js"))
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));
const LandingPage = lazy(() => import("../views/LandingPage.js"));

/*****Routes******/

const ThemeRoutes = () => {
  return (
    <Routes>
      <Route path="/home" index element={<LandingPage />}></Route>
      <Route path="/auth"  element={<Authenticate />}></Route>
      <Route path="/" element={<ProtectedRoute><FullLayout/></ProtectedRoute>}>
        <Route path="/starter" element={<Starter />} />
        <Route path="/about" element={<About />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/badges" element={<Badges />} />
        <Route path="/buttons" element={<Buttons />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/grid" element={<Grid />} />
        <Route path="/table" element={<Tables />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="/breadcrumbs" element={<Breadcrumbs />} />
      </Route>
    </Routes>
  )
};

export default ThemeRoutes;
