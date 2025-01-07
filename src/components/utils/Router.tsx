import { lazy } from "react";
import { Navigate } from "react-router-dom";
import * as Landing from "@/pages/landing";
import * as Admin from "@/pages/admin";

// Middleware
import AdminMiddleware from "./middlewares/AdminMiddleware";
// import UserMiddleware from "./middlewares/UserMiddleware";

// Layout
const LandingLayout = lazy(() => import("@/layouts/LandingLayout"));
const DefaultLayout = lazy(() => import("@/layouts/DefaultLayout"));

// Auth
const LoginAdminPage = lazy(() => import("@/pages/auth/AdminLoginPage"));

export default function GetBrowserRoutes() {
  return [
    {
      path: "/",
      element: <LandingLayout />,
      children: [{ index: true, element: <Landing.LandingPage /> }],
    },

    // Patient Login
    // {
    //   path: "/login",
    //   element: (
    //     <UserMiddleware>
    //       <LoginPage />
    //     </UserMiddleware>
    //   ),
    // },

    // Admin Login
    {
      path: "/admin/login",
      element: (
        <AdminMiddleware>
          <LoginAdminPage />
        </AdminMiddleware>
      ),
    },

    // Admin Router
    {
      path: "/admin",
      element: (
        <AdminMiddleware>
          <DefaultLayout />
        </AdminMiddleware>
      ),
      errorElement: <Admin.ErrorPage />,
      children: [
        { index: true, element: <Navigate to="dashboard" /> },
        { path: "dashboard", element: <Admin.DashboardPage /> },
        { path: "patient", element: <Admin.PatientPage /> },
      ],
    },
  ];
}
