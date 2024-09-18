import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import LandingNavbar from "./LandingNavbar";
// import LandingNavbarMobile from "./LandingNavbar/LandingNavbarMobile";
import LandingHelmet from "./LandingHelmet";
import jquery from "jquery";

const LandingLayout: FunctionComponent = () => {
  (window as any).$ = (window as any).jQuery = jquery;

  setTimeout(() => {
    $(".preloader").css("display", "none");
  }, 5000);

  return (
    <HelmetProvider>
      {/* assets */}
      <LandingHelmet />
      {/* <div className="custom-cursor"> */}
      {/* <div className="custom-cursor__cursor"></div>
        <div className="custom-cursor__cursor-two"></div> */}

      {/* <div className="preloader">
          <div
            className="preloader__image"
            style={{ backgroundImage: "url(/assets/images/loader.png)" }}
          ></div>
        </div> */}

      <div className="page-wrapper">
        <LandingNavbar />
        {/* <div className="stricky-header stricked-menu main-menu">
            <div className="sticky-header__content"></div>
          </div> */}
        {/* <div className="stricky-header stricked-menu main-menu main-header-two">
            <div className="sticky-header__content"></div>
          </div> */}

        <Outlet />
      </div>

      {/* <LandingNavbarMobile /> */}

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

      <div className="group fixed bottom-5 right-5 p-2  flex items-end justify-end w-24 h-24 ">
        {/* main */}
        <a
          href="https://www.linkedin.com/in/ktyudha"
          target="_blank"
          className="text-white shadow-xl flex items-center justify-center p-4 rounded-full bg-black z-50 absolute"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-linkedin w-5 h-5 duration-[0.6s]"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
          </svg>
        </a>
      </div>
    </HelmetProvider>
  );
};

export default LandingLayout;
