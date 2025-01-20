import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import LandingNavbar from "./LandingNavbar";
// import LandingNavbarMobile from "./LandingNavbar/LandingNavbarMobile";
// import LandingHelmet from "./LandingHelmet";
import jquery from "jquery";
import LandingBottombar from "./LandingBottombar";

const LandingLayout: FunctionComponent = () => {
  (window as any).$ = (window as any).jQuery = jquery;

  setTimeout(() => {
    $(".preloader").css("display", "none");
  }, 5000);

  return (
    <HelmetProvider>
      {/* assets */}
      {/* <LandingHelmet /> */}

      <LandingNavbar />
      <main>
        <Outlet />
      </main>
      <LandingBottombar />

      {/* <div className="scroll-top">
        <svg
          className="scroll-top__circle"
          width="100%"
          height="100%"
          viewBox="-1 -1 102 102"
        >
          <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
        </svg>
      </div> */}

      {/* </div> */}

      {/* <div className="group fixed bottom-5 right-5 flex items-end justify-end w-56 z-50">
        <a
          href="https://www.linkedin.com/in/ktyudha"
          target="_blank"
          className="text-white shadow-xl flex items-center justify-center py-1.5 px-3 rounded-lg bg-[#1c2674] opacity-80 z-50 absolute"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-chat-left-fill w-3.5 h-3.5 my-auto mr-2"
            viewBox="0 0 16 16"
          >
            <path d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
          </svg>
          Let's Chat!
        </a>
      </div> */}
    </HelmetProvider>
  );
};

export default LandingLayout;
