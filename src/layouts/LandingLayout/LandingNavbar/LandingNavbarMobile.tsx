import { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import Logo from "@/assets/icons/logo-tracer-study.png";

const LandingNavbarMobile: FunctionComponent = () => {
  return (
    <div className="mobile-nav__wrapper">
      <div className="mobile-nav__overlay mobile-nav__toggler"></div>
      <div className="mobile-nav__content">
        <span className="mobile-nav__close mobile-nav__toggler">
          <i className="fa fa-times"></i>
        </span>
        <div className="logo-box">
          <NavLink to="/" aria-label="logo image">
            <img src={Logo} width="165" height="48" alt="eduact" />
          </NavLink>
        </div>
        <div className="mobile-nav__container"></div>
        <ul className="mobile-nav__contact list-unstyled">
          <li>
            <i className="fas fa-envelope"></i>
            <a href="mailto:admin@disdik.kalteng.go.id">
              admin@disdik.kalteng.go.id
            </a>
          </li>
          <li>
            <i className="fa fa-phone-alt"></i>
            <a href="tel:3035550105">(303) 555-0105</a>
          </li>
        </ul>
        <div className="mobile-nav__social">
          <a href="https://twitter.com/">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.facebook.com/">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://www.pinterest.com/">
            <i className="fab fa-pinterest-p"></i>
          </a>
          <a href="https://www.instagram.com/">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingNavbarMobile;
