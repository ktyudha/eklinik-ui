import { FunctionComponent } from "react";
import ToggleThemeNavbar from "./ToggleThemeNavbar";
// import { useNavigate } from "react-router-dom";
// import { NavLink } from "react-router-dom";

const LandingNavbar: FunctionComponent = () => {
  // const navigate = useNavigate();

  return (
    // <header className="main-header">
    //   <nav className="main-menu">
    //     <div className="container">
    //       <div className="main-menu__logo">
    //         <a onClick={() => navigate("/")}>
    //           <img
    //             src="assets/images/logo-light.png"
    //             width="183"
    //             height="48"
    //             alt="Eduact"
    //           />
    //         </a>
    //       </div>
    //       <div className="main-menu__nav">
    //         <ul className="main-menu__list one-page-scroll-menu">
    //           <li className="scrollToLink">
    //             <a onClick={() => navigate("/")}>Home</a>
    //           </li>
    //           <li className="scrollToLink">
    //             <a onClick={() => navigate("/")} href="#about">
    //               Tracer Study
    //             </a>
    //           </li>
    //           <li className="scrollToLink">
    //             <a onClick={() => navigate("/")} href="#course">
    //               Fitur
    //             </a>
    //           </li>

    //           <li className="scrollToLink">
    //             <a onClick={() => navigate("/")} href="faq">
    //               FAQ
    //             </a>
    //           </li>
    //           <li className="scrollToLink">
    //             <a onClick={() => navigate("/")} href="contact">
    //               Kontak
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //       <div className="main-menu__right">
    //         <a href="#" className="main-menu__toggler mobile-nav__toggler">
    //           <i className="fa fa-bars"></i>
    //         </a>
    //         <a href="#" className="main-menu__search search-toggler">
    //           <i className="icon-Search"></i>
    //         </a>
    //         <NavLink to="/login" className="main-menu__login">
    //           <i className="icon-account-1"></i>
    //         </NavLink>
    //         <NavLink to="/login" className="eduact-btn">
    //           <span className="eduact-btn__curve"></span>Login Access
    //         </NavLink>
    //       </div>
    //     </div>
    //   </nav>
    // </header>
    <div className="navbar bg-base-100 fixed top-0 left-0 right-0 z-50  bg-opacity-60  backdrop-blur">
      <div className="container flex flex-row justify-between items-center mx-auto md:px-20 px-5">
        <div className="flex-1">
          <a className="text-xl font-bold">Kurniawan Try Yudha</a>
        </div>

        <ul className="font-medium flex flex-row gap-10">
          <li>
            <ToggleThemeNavbar />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LandingNavbar;
