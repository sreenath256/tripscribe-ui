import React, { lazy, Suspense, useState, useEffect } from "react";
import "./App.css";
import { AnimatePresence, motion } from "framer-motion";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";

// Import your preloader here
import { Header, Footer, NotFound, Loading } from "./components";

// Lazy load pages
const Home = lazy(() => import("./pages/index"));
const About = lazy(() => import("./pages/about"));
const Contact = lazy(() => import("./pages/contact"));

const Layout = () => {
  const location = useLocation();
  const [scrollHistory, setScrollHistory] = useState({});

  useEffect(() => {
    if (scrollHistory[location.key]) {
      window.scrollTo(0, scrollHistory[location.key]);
    } else {
      window.scrollTo(0, 0);
    }

    const saveScrollPosition = () => {
      setScrollHistory((prev) => ({
        ...prev,
        [location.key]: window.scrollY,
      }));
    };


    window.addEventListener("beforeunload", saveScrollPosition);

    return () => {
      saveScrollPosition();
      window.removeEventListener("beforeunload", saveScrollPosition);
    };
  }, [location.key]);

  return (
    <div className="app 2xl:max-w-[2500px] mx-auto min-h-screen flex flex-col justify-between">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<Loading />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<Loading />}>
            <Contact />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<Loading />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fakeDataFetch = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 0);
    };

    fakeDataFetch();
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <Loading key="preloader" />}
      </AnimatePresence>
      {!isLoading && (
        <motion.div
          key="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
          className="w-full min-h-screen"
        >
          <RouterProvider router={router} />
        </motion.div>
      )}
    </>
  );
}

export default App;
