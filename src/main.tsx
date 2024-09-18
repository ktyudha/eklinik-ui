import { StrictMode, useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from "react-router-dom";

import GetBrowserRoutes from "./components/utils/Router.tsx";
import { ToastContainer } from "react-toastify";
import * as Sentry from "@sentry/react";

// import Loader from "@/components/reusable/Loader.tsx";
import "./styles/main.css";

Sentry.init({
  dsn: "https://27b4c11728048c439491f7a37fc1a983@o4507917736345600.ingest.us.sentry.io/4507971372974080",
  // integrations: [
  //   new Sentry.BrowserTracing({
  //     // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  //     tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  //   }),
  //   new Sentry.Replay(),
  // ],
  integrations: [
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

const sentryCreateBrowserRouter =
  Sentry.wrapCreateBrowserRouter(createBrowserRouter);
const router = sentryCreateBrowserRouter(GetBrowserRoutes());
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <ToastContainer />
    {/* <Suspense fallback={<Loader />}> */}
    <RouterProvider router={router} />
    {/* </Suspense> */}
  </StrictMode>
);
