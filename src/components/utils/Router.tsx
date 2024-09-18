import { lazy } from "react";
import * as Landing from "@/pages/landing";

// Layout
const LandingLayout = lazy(() => import("@/layouts/LandingLayout"));

export default function GetBrowserRoutes() {
  return [
    {
      path: "/",
      element: <LandingLayout />,
      children: [
        { index: true, element: <Landing.LandingPage /> },
        { path: "/faq", element: <Landing.FaqPage /> },
        { path: "/contact", element: <Landing.ContactPage /> },
      ],
    },
  ];
}
