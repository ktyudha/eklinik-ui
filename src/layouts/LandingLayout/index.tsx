import { FunctionComponent } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import LandingNavbar from "./LandingNavbar";
import LandingBottombar from "./LandingBottombar";

const LandingLayout: FunctionComponent = () => {
  const { pathname } = useLocation();
  return (
  <HelmetProvider>
    <main className="min-h-dvh bg-white pb-16 md:pb-0">
      <LandingNavbar />
      <div key={pathname} className="page-enter"><Outlet /></div>
      <LandingBottombar />
    </main>
  </HelmetProvider>
  );
};

export default LandingLayout;
