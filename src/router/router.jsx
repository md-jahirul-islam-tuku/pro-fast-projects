import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home";
import ErrorPage from "../pages/ErrorPage";
import AuthLayout from "../layouts/AuthLayout";
import LogIn from "../pages/LogIn";
import Register from "../pages/Register";
import BangladeshCoverage from "../pages/Coverage";
import AddParcel from "../pages/AddParcel";
import AboutUs from "../pages/AboutUs";
import PrivateRoute from "../routes/PriveateRoute";
import Dashboard from "../pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: Home },
      { path: "coverage", Component: BangladeshCoverage },
      {
        path: "pricing",
        element: (
          <PrivateRoute>
            <AddParcel />
          </PrivateRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      { path: "about", Component: AboutUs },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      { path: "login", Component: LogIn },
      { path: "register", Component: Register },
    ],
  },
]);
export default router;
