import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home";
import ErrorPage from "../pages/ErrorPage";
import AuthLayout from "../layouts/AuthLayout";
import LogIn from "../pages/LogIn";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
    children: [{ index: true, Component: Home }],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [{ path: "login", Component: LogIn }],
  },
]);
export default router;
