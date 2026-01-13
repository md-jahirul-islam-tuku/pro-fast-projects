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
import MyParcels from "../components/Dashboard/MyParcels";
import MyProfile from "../components/Dashboard/MyProfile";
import Settings from "../components/Dashboard/Settings";
import BeARider from "../pages/BeARider";
import CheckoutForm from "../components/Dashboard/CheckoutForm";
import Payments from "../components/Dashboard/Payments";
import TrackPackage from "../components/Dashboard/TrackPackage";
import Services from "../pages/Services";
import PendingRiders from "../components/Dashboard/PendingRiders";
import ApprovedRiders from "../components/Dashboard/ApprovedRiders";
import ManageUsers from "../components/Dashboard/ManageUsers";
import AdminRoute from "../routes/AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: Home },
      { path: "services", Component: Services },
      { path: "coverage", Component: BangladeshCoverage },
      {
        path: "be-rider",
        element: (
          <PrivateRoute>
            <BeARider />
          </PrivateRoute>
        ),
      },
      {
        path: "sendParcel",
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
        children: [
          { index: true, Component: MyParcels },
          {
            path: "parcels",
            Component: MyParcels,
          },
          { path: "profile", Component: MyProfile },
          {
            path: "payments/:email",
            Component: Payments,
          },
          {
            path: "pendingRiders",
            element: (
              <AdminRoute>
                <PendingRiders />
              </AdminRoute>
            ),
          },
          {
            path: "activeRiders",
            element: (
              <AdminRoute>
                <ApprovedRiders />
              </AdminRoute>
            ),
          },
          {
            path: "manageUsers",
            element: (
              <AdminRoute>
                <ManageUsers />
              </AdminRoute>
            ),
          },
          {
            path: "trackPackage",
            element: (
              <AdminRoute>
                <TrackPackage />
              </AdminRoute>
            ),
          },
          { path: "settings", Component: Settings },
          { path: "parcels/payment/:id", Component: CheckoutForm },
        ],
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
