/* eslint-disable @typescript-eslint/no-explicit-any */
import { FunctionComponent } from "react";
import FooterSection from "../sections/FooterSection";
import SubscribeSection from "../sections/SubscribeSection";

const Contact: FunctionComponent = () => {
  return (
    <>
      <section
        className="hero-banner"
        style={{ backgroundImage: "url(assets/images/shapes/banner-bg-1.png)" }}
        id="home"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="hero-banner__content">
                <div
                  className="hero-banner__bg-shape1 wow zoomIn"
                  data-wow-delay="300ms"
                >
                  <div className="hero-banner__bg-round">
                    <div className="hero-banner__bg-round-border"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="hero-banner__border wow fadeInUp"
          data-wow-delay="1100ms"
        ></div>
      </section>

      <section className="contact-one">
        <div className="container wow fadeInUp" data-wow-delay="300ms">
          <div className="section-title  text-center">
            <h5 className="section-title__tagline">
              Contact with Us
              <svg
                className="arrow-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 55 13"
              >
                <g clipPath="url(#clip0_324_36194)">
                  <path d="M10.5406 6.49995L0.700562 12.1799V8.56995L4.29056 6.49995L0.700562 4.42995V0.819946L10.5406 6.49995Z" />
                  <path d="M25.1706 6.49995L15.3306 12.1799V8.56995L18.9206 6.49995L15.3306 4.42995V0.819946L25.1706 6.49995Z" />
                  <path d="M39.7906 6.49995L29.9506 12.1799V8.56995L33.5406 6.49995L29.9506 4.42995V0.819946L39.7906 6.49995Z" />
                  <path d="M54.4206 6.49995L44.5806 12.1799V8.56995L48.1706 6.49995L44.5806 4.42995V0.819946L54.4206 6.49995Z" />
                </g>
              </svg>
            </h5>
            <h2 className="section-title__title">
              Feel Free to Call us Anytime
            </h2>

            <div className="result"></div>
          </div>
        </div>
      </section>

      <section className="contact-info">
        <div className="container">
          <ul className="contact-info__wrapper">
            <li>
              <div className="contact-info__icon">
                <span className="icon-Call"></span>
              </div>
              <p className="contact-info__title">Hubungi WhatsApp</p>
              <h4 className="contact-info__text">
                <a
                  href="https://web.whatsapp.com/send?phone=6285876044000"
                  target="_blank"
                >
                  0858-7604-4000
                </a>
              </h4>
            </li>
            <li className="active">
              <div className="contact-info__icon">
                <span className="icon-Email"></span>
              </div>
              <p className="contact-info__title">Kirim Email</p>
              <h4 className="contact-info__text">
                <a href="mailto:admin@edubrand.id">admin@edubrand.id</a>
              </h4>
            </li>
            <li>
              <div className="contact-info__icon">
                <span className="icon-Location"></span>
              </div>
              <p className="contact-info__title">Kantor Pusat</p>
              <h4 className="contact-info__text">
                Kota Semarang, Prov. Jawa Tengah
              </h4>
            </li>
          </ul>
        </div>
      </section>

      <section className="google-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15839.123595329322!2d110.4718315!3d-7.0350184!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708dcefec3cac9%3A0xe14a6d7d4a0e6915!2sEDUBRAND%20%5B%20PT%20EDU%20INOVASI%20INDONESIA%20%5D!5e0!3m2!1sid!2sid!4v1702165824860!5m2!1sid!2sid"
          className="google-map__one"
        ></iframe>
      </section>

      <SubscribeSection />
      <FooterSection />
    </>
  );
};

export default Contact;
