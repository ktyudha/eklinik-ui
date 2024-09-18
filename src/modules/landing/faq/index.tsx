/* eslint-disable @typescript-eslint/no-explicit-any */
import { FunctionComponent, useState } from "react";
import FooterSection from "../sections/FooterSection";
import SubscribeSection from "../sections/SubscribeSection";
import faqData from "./faq.constant";

const Faq: FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(faqData[1]?.id || null);

  const handleClick = (id: any) => {
    setIsOpen(id !== isOpen ? id : null);
  };

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

      <section className="accrodion-one">
        <div className="container">
          <div className="section-title text-center">
            <h5 className="section-title__tagline">
              tracer study FAQS
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
              Frequently Asked Question & <br />
              Answers Here
            </h2>
          </div>
          <div
            className="accrodion-one__wrapper eduact-accrodion"
            data-grp-name="eduact-accrodion"
          >
            {faqData.map((_data, _idx) => (
              <div
                className={`accrodion ${isOpen === _data.id ? "active" : ""}`}
                key={_idx}
              >
                <span
                  className="accrodion__icon"
                  onClick={() => handleClick(_data.id)}
                ></span>
                <div className="accrodion-title">
                  <h4> {_data.question}</h4>
                </div>

                <div
                  className={`accrodion-content ${
                    isOpen === _data.id ? "open" : ""
                  }`}
                >
                  <div className="inner">
                    <p>{_data.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SubscribeSection />
      <FooterSection />
    </>
  );
};

export default Faq;
