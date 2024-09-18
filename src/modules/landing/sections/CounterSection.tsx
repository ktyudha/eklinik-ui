import { FunctionComponent } from "react";

const CounterSection: FunctionComponent = () => (
  <section
    className="fact-one"
    style={{ backgroundImage: "url(/assets/images/shapes/fact-bg-1.png)" }}
  >
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="100ms">
          <div className="text-center fact-one__item">
            <svg
              viewBox="0 0 303 181"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1.5"
                y="2.00049"
                width="300"
                height="177"
                rx="7"
                stroke="#4F5DE4"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="20 20"
              />
            </svg>
            <div className="fact-one__count">
              <span className="count-box">
                <span className="count-text" data-stop="380" data-speed="1500">
                  380
                </span>
              </span>
            </div>
            <h3 className="fact-one__title">Satuan Pendidikan</h3>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="200ms">
          <div className="text-center fact-one__item">
            <svg
              viewBox="0 0 303 181"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1.5"
                y="2.00049"
                width="300"
                height="177"
                rx="7"
                stroke="#4F5DE4"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="20 20"
              />
            </svg>
            <div className="fact-one__count">
              <span className="count-box">
                <span className="count-text" data-stop="242" data-speed="1500">
                  242
                </span>
              </span>
            </div>
            <h3 className="fact-one__title">SMA</h3>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="300ms">
          <div className="text-center fact-one__item">
            <svg
              viewBox="0 0 303 181"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1.5"
                y="2.00049"
                width="300"
                height="177"
                rx="7"
                stroke="#4F5DE4"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="20 20"
              />
            </svg>
            <div className="fact-one__count">
              <span className="count-box">
                <span className="count-text" data-stop="138" data-speed="1500">
                  138
                </span>
              </span>
            </div>
            <h3 className="fact-one__title">SMK</h3>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="400ms">
          <div className="text-center fact-one__item">
            <svg
              viewBox="0 0 303 181"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1.5"
                y="2.00049"
                width="300"
                height="177"
                rx="7"
                stroke="#4F5DE4"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="20 20"
              />
            </svg>
            <div className="fact-one__count">
              <span className="count-box">
                <span
                  className="count-text"
                  data-stop="31.656"
                  data-speed="1500"
                >
                  31.656
                </span>
              </span>
            </div>
            <h3 className="fact-one__title">Peserta Didik</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CounterSection;
