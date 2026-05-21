import React, { lazy, Suspense, useState, useEffect } from "react";
import "./App.css";
import { AnimatePresence, motion } from "framer-motion";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { Header, Footer, NotFound, Loading } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataFirst } from "./redux/actions/userActions.jsx";


// Lazy load pages
const Home = lazy(() => import("./pages/index"));
const About = lazy(() => import("./pages/about"));
const Contact = lazy(() => import("./pages/contact"));
const Blogs = lazy(() => import("./pages/Blogs"));
const BlogDetails = lazy(() => import("./pages/BlogDetails.jsx"));
const Shop = lazy(() => import("./pages/shop"));
const ShopDetails = lazy(() => import("./pages/StayDetails"));



// Admin
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const StaysManagement = lazy(() => import("./pages/admin/StaysManagement.jsx"));
const AdminBlogs = lazy(() => import("./pages/admin/AdminBlogs.jsx"));
const AddBlog = lazy(() => import("./pages/admin/AddBlog.jsx"))
const EditBlog = lazy(() => import("./pages/admin/EditBlog.jsx"))


const StayFormPage = lazy(() => import("./pages/admin/StayFormPage.jsx"));
const PackagesManagement = lazy(() => import("./pages/admin/PackagesManagement.jsx"));

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
    <div className="app min-h-screen 2xl:max-w-[2500px] mx-auto flex flex-col justify-between">
      <Header />
      <main className="flex-1 w-full flex flex-col min-h-[100vh]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

// --- PUBLIC ROUTER (No User Logged In) ---
const publicRouter = createBrowserRouter([
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
      {
        path: "/blogs",
        element: (
          <Suspense fallback={<Loading />}>
            <Blogs />
          </Suspense>
        ),
      },
      {
        path: "/blogs/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <BlogDetails />
          </Suspense>
        ),
      },
      {
        path: "/shop",
        element: (
          <Suspense fallback={<Loading />}>
            <Shop />
          </Suspense>
        ),
      },
      {
        path: "/stays/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <ShopDetails />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      }
    ],
  },
  {
    path: "/dashboard",
    // Redirect unauthorized users to login
    element: <Navigate to="/login" replace />
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


// --- ADMIN ROUTER (User Logged In) ---
const adminRouter = createBrowserRouter([
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={<Loading />}>
        <Dashboard />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="stays" replace />
      },
      {
        path: "stays",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loading />}>
                <StaysManagement />
              </Suspense>
            ),
          },
          {
            path: "add",
            element: (
              <Suspense fallback={<Loading />}>
                <StayFormPage />
              </Suspense>
            ),
          },
          {
            path: "edit/:id",
            element: (
              <Suspense fallback={<Loading />}>
                <StayFormPage />
              </Suspense>
            ),
          }
        ]
      },
      {
        path: "blogs",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loading />}>
                <AdminBlogs />
              </Suspense>
            ),
          },
          {
            path: "add",
            element: (
              <Suspense fallback={<Loading />}>
                <AddBlog />
              </Suspense>
            ),
          },
          {
            path: "edit/:id",
            element: (
              <Suspense fallback={<Loading />}>
                <EditBlog />
              </Suspense>
            ),
          }
        ]
      },
      {
        path: "packages",
        element: (
          <Suspense fallback={<Loading />}>
            <PackagesManagement />
          </Suspense>
        ),
      }
    ]
  },
  {
    element: <Layout />,
    children: [
      {
        path: "/stays/:id",
        element: (
          <Suspense fallback={<Loading />}>
            <ShopDetails />
          </Suspense>
        ),
      }
    ]
  },
  {
    path: "/",
    // Restrict home page and redirect to dashboard for admins
    element: <Navigate to="/dashboard/stays" replace />
  },
  {
    path: "/login",
    // Prevent logged in users from seeing login page
    element: <Navigate to="/dashboard/stays" replace />
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
  const { user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Authenticate user on mount
  useEffect(() => {
    const fetchAuthSession = async () => {
      await dispatch(getUserDataFirst());
      // Artificial delay to preserve the existing preloader visual effect
      setTimeout(() => {
        setIsInitialLoad(false);
      }, 1500);
    };

    fetchAuthSession();
  }, [dispatch]);

  // Determine if the app is still loading based on the manual timer OR the Redux state
  const isAppLoading = false;

  return (
    <>
      <Toaster position="top-center" />
      <AnimatePresence>
        {isAppLoading && <Loading key="preloader" />}
      </AnimatePresence>

      {!isAppLoading && (
        <motion.div
          key="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
          className="w-full min-h-screen"
        >
          {/* Dynamically swap the entire App Router based on Redux User State */}
          <RouterProvider router={user ? adminRouter : publicRouter} />
        </motion.div>
      )}
    </>
  );
}

export default App;
