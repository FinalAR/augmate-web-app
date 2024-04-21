import { lazy } from "react";
import { Navigate, Route, Routes, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "../components/ProtectedRoute.js";
import FullLayout from "../layouts/FullLayout.js";

/****Layouts*****/
const Authenticate = lazy(() => import("../views/ui/Authenticate.js"))

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const ContentMapping = lazy(()=>import('../views/ui/Content-Mapping.js'));
const Forms = lazy(() => import("../views/ui/Forms"));
const ContentUpload = lazy(() => import("../views/ui/ContentUpload"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));
const LandingPage = lazy(() => import("../views/LandingPage"));
const ExploreWindow = lazy(() => import("../views/exploreWindow.js"));
const ExploreLoadWindow = lazy(() => import("../views/exploreLoadMethods.js"));
const ScanningPage = lazy(() => import("../views/scanningPage.js"));
const AdexplorePage = lazy(() => import("../views/exploreAdvanced.js"));
const AdexploreHashPage = lazy(() => import("../views/exploreHasher.js"));
const AdexploreLoaderPage = lazy(() => import("../views/exploreloaders.js"));
const AdexploreARLoaderPage = lazy(() => import("../views/exploreARLoaders.js"));


const AdexplorePageDefault = lazy(() => import("../views/exploreAdvancedDefault.js"));

/********* Interactive Strategies ************/
const AdexplorePage1 = lazy(() => import("../views/exploreAdvanced1.js")); // Rise loader on screen
const AdexplorePage2 = lazy(() => import("../views/exploreAdvanced2.js")); // Circular Progress loader on screen
const AdexplorePage3 = lazy(() => import("../views/exploreAdvanced3.js")); // Progress bar on target
const AdexplorePage4 = lazy(() => import("../views/exploreAdvanced4.js")); // Rotation Cube on target
const AdexplorePage5 = lazy(() => import("../views/exploreAdvanced5.js")); // Rise loader on screen with Progress bar on target
const AdexplorePage6 = lazy(() => import("../views/exploreAdvanced6.js")); // Circular Progress loader on screen with Rotation Cube on target

/*****Routes******/
// const ThemeRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/home" index element={<LandingPage />}></Route>
//       <Route path="/explore" index element={<ExploreWindow />}></Route>
//       <Route path="/exploreMethods" index element={<ExploreLoadWindow />}></Route>
//       <Route path="/auth"  element={<Authenticate />}></Route>
//       {/* <Route path="/" element={<ProtectedRoute><Navigate to="/home" /><FullLayout/></ProtectedRoute>}> */}

//         <Route path="/">  
//         <ProtectedRoute>
//         <Route path="/starter" element={<Starter />} />

//       </ProtectedRoute>
//         <Route path="/about" element={<About />} />
//         <Route path="/alerts" element={<Alerts />} />
//         <Route path="/badges" element={<Badges />} />
//         <Route path="/buttons" element={<Buttons />} />
//         <Route path="/cards" element={<Cards />} />
//         <Route path="/grid" element={<Grid />} />
//         <Route path="/table" element={<Tables />} />
//         <Route path="/forms" element={<Forms />} />
//         <Route path="/breadcrumbs" element={<Breadcrumbs />} />
//       </Route>
//     </Routes>
//   )
// };

// export default ThemeRoutes;


const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/home',
    element: <LandingPage />
  },
  {
    path: '/scanning',
    element: <ScanningPage />
  },
  {
    path: '/adexplore',
    element: <AdexplorePage />
  },
  {
    path: '/adexploreDefault',
    element: <AdexplorePageDefault />
  },
  {
    path: '/adexplore1',
    element: <AdexplorePage1 />
  },
  {
    path: '/adexplore2',
    element: <AdexplorePage2 />
  },
  {
    path: '/adexplore3',
    element: <AdexplorePage3 />
  },
  {
    path: '/adexplore4',
    element: <AdexplorePage4 />
  },
  {
    path: '/adexplore5',
    element: <AdexplorePage5 />
  },
  {
    path: '/adexplore6',
    element: <AdexplorePage6 />
  },
  {
    path: '/hasher',
    element: <AdexploreHashPage />
  },
  {
    path: '/spanLoaders',
    element: <AdexploreLoaderPage />
  },
  {
    path: '/ARLoaders',
    element: <AdexploreARLoaderPage />
  },
  {
    path: '/explore',
    element: <ExploreWindow />
  },
  {
    path: '/exploreMethods',
    element: <ExploreLoadWindow />
  },
  {
    path: '/auth',
    element: <Authenticate />
  },
  {
    path: '/',
    element: <ProtectedRoute><FullLayout /></ProtectedRoute>,
    children: [
      {
        path: '/starter',
        element: <Starter />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/alerts',
        element: <Alerts />
      },
      {
        path: '/badges',
        element: <Badges />
      },
      {
        path: '/buttons',
        element: <Buttons />
      },
      {
        path: '/cards',
        element: <Cards />
      },
      {
        path: '/grid',
        element: <Grid />
      },
      {
        path: '/table',
        element: <Tables />
      },
      {
        path: '/content-mapping',
        element: <ContentMapping />
      },
      {
        path: '/forms',
        element: <Forms />
      },
      {
        path: '/ContentUpload',
        element: <ContentUpload />
      },
      {
        path: '/breadcrumbs',
        element: <Breadcrumbs />
      }
    ]
  }
])

export default router;