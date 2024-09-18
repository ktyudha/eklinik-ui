import { FunctionComponent } from "react";

const CategorySection: FunctionComponent = () => (
  <>
    <section
      className="category-one"
      style={{ backgroundImage: "url(assets/images/shapes/category-bg-1.jpg)" }}
    >
      <div className="container">
        <div className="section-title text-center">
          <h5 className="section-title__tagline">
            PROGRAM & LAYANAN
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 133 13"
              fill="none"
            >
              <path
                d="M9.76794 0.395L0.391789 9.72833C-0.130596 10.2483 -0.130596 11.095 0.391789 11.615C0.914174 12.135 1.76472 12.135 2.28711 11.615L11.6633 2.28167C12.1856 1.76167 12.1856 0.915 11.6633 0.395C11.1342 -0.131667 10.2903 -0.131667 9.76794 0.395Z"
                fill="#F1F2FD"
              />
              <path
                d="M23.1625 0.395L13.7863 9.72833C13.2639 10.2483 13.2639 11.095 13.7863 11.615C14.3087 12.135 15.1593 12.135 15.6816 11.615L25.0578 2.28167C25.5802 1.76167 25.5802 0.915 25.0578 0.395C24.5287 -0.131667 23.6849 -0.131667 23.1625 0.395Z"
                fill="#F1F2FD"
              />
              <path
                d="M36.5569 0.395L27.1807 9.72833C26.6583 10.2483 26.6583 11.095 27.1807 11.615C27.7031 12.135 28.5537 12.135 29.076 11.615L38.4522 2.28167C38.9746 1.76167 38.9746 0.915 38.4522 0.395C37.9231 -0.131667 37.0793 -0.131667 36.5569 0.395Z"
                fill="#F1F2FD"
              />
              <path
                d="M49.9514 0.395L40.5753 9.72833C40.0529 10.2483 40.0529 11.095 40.5753 11.615C41.0976 12.135 41.9482 12.135 42.4706 11.615L51.8467 2.28167C52.3691 1.76167 52.3691 0.915 51.8467 0.395C51.3176 -0.131667 50.4738 -0.131667 49.9514 0.395Z"
                fill="#F1F2FD"
              />
              <path
                d="M63.3459 0.395L53.9698 9.72833C53.4474 10.2483 53.4474 11.095 53.9698 11.615C54.4922 12.135 55.3427 12.135 55.8651 11.615L65.2413 2.28167C65.7636 1.76167 65.7636 0.915 65.2413 0.395C64.7122 -0.131667 63.8683 -0.131667 63.3459 0.395Z"
                fill="#F1F2FD"
              />
              <path
                d="M76.7405 0.395L67.3643 9.72833C66.8419 10.2483 66.8419 11.095 67.3643 11.615C67.8867 12.135 68.7373 12.135 69.2596 11.615L78.6358 2.28167C79.1582 1.76167 79.1582 0.915 78.6358 0.395C78.1067 -0.131667 77.2629 -0.131667 76.7405 0.395Z"
                fill="#F1F2FD"
              />
              <path
                d="M90.1349 0.395L80.7587 9.72833C80.2363 10.2483 80.2363 11.095 80.7587 11.615C81.2811 12.135 82.1317 12.135 82.6541 11.615L92.0302 2.28167C92.5526 1.76167 92.5526 0.915 92.0302 0.395C91.5011 -0.131667 90.6573 -0.131667 90.1349 0.395Z"
                fill="#F1F2FD"
              />
              <path
                d="M103.529 0.395L94.1533 9.72833C93.6309 10.2483 93.6309 11.095 94.1533 11.615C94.6756 12.135 95.5262 12.135 96.0486 11.615L105.425 2.28167C105.947 1.76167 105.947 0.915 105.425 0.395C104.896 -0.131667 104.052 -0.131667 103.529 0.395Z"
                fill="#F1F2FD"
              />
              <path
                d="M116.924 0.395L107.548 9.72833C107.025 10.2483 107.025 11.095 107.548 11.615C108.07 12.135 108.921 12.135 109.443 11.615L118.819 2.28167C119.342 1.76167 119.342 0.915 118.819 0.395C118.29 -0.131667 117.446 -0.131667 116.924 0.395Z"
                fill="#F1F2FD"
              />
              <path
                d="M130.318 0.395L120.942 9.72833C120.42 10.2483 120.42 11.095 120.942 11.615C121.465 12.135 122.315 12.135 122.838 11.615L132.214 2.28167C132.736 1.76167 132.736 0.915 132.214 0.395C131.685 -0.131667 130.841 -0.131667 130.318 0.395Z"
                fill="#F1F2FD"
              />
            </svg>
          </h5>
          <h2 className="section-title__title">Layanan Asesmen Edubrand</h2>
        </div>
        <div
          className="category-one__slider eduact-owl__carousel owl-with-shadow owl-theme owl-carousel"
          data-owl-options='{
            "items": 4,
            "margin": 30,
            "smartSpeed": 700,
            "loop":true,
            "autoplay": true,
            "nav":false,
            "dots":true,
            "navText": ["<span className=\"icon-arrow-left\"></span>","<span className=\"icon-arrow\"></span>"],
            "responsive":{
                "0":{
                    "items":1,
                    "nav":true,
                    "dots":false,
                    "margin": 0
                },
                "670":{
                    "nav":true,
                    "dots":false,
                    "items": 2
                },
                "992":{
                    "items": 3
                },
                "1200":{
                    "items": 3
                },
                "1400":{
                    "items": 4,
                    "margin": 36
                }
            }
            }'
        >
          <div className="item">
            <div className="category-one__item">
              <div
                className="category-one__wrapper"
                style={{
                  backgroundImage:
                    "url(assets/images/shapes/category-shape.png)",
                }}
              >
                <div className="category-one__thumb">
                  <img
                    src="assets/images/category/category-normal-1.png"
                    alt="eduact"
                  />
                </div>
                <div className="category-one__content">
                  <div className="category-one__icon">
                    <span className="icon-education"></span>
                  </div>
                  <h3 className="category-one__title">
                    Student Diagnostic Assessment Test
                  </h3>
                  <p className="category-one__text">[SDAT]</p>
                </div>
              </div>
              <div className="category-one__hover">
                <div className="category-one__hover__thumb">
                  <img
                    src="assets/images/category/category-hover-1.png"
                    alt="eduact"
                  />
                </div>
                <div className="category-one__hover__content">
                  <div className="category-one__hover__icon">
                    <span className="icon-education"></span>
                  </div>
                  <h3 className="category-one__hover__title">
                    <a href="https://psikologi.edubrand.id" target="_blank">
                      Asesmen Diagnostik Kurikulum Merdeka
                    </a>
                  </h3>
                  <p className="category-one__hover__text">[SDAT]</p>
                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="category-one__item">
              <div
                className="category-one__wrapper"
                style={{
                  backgroundImage:
                    "url(assets/images/shapes/category-shape.png)",
                }}
              >
                <div className="category-one__thumb">
                  <img
                    src="assets/images/category/category-normal-2.png"
                    alt="eduact"
                  />
                </div>
                <div className="category-one__content">
                  <div className="category-one__icon">
                    <span className="icon-Technology"></span>
                  </div>
                  <h3 className="category-one__title">
                    Asesmen Pemetaan Mata Pelajaran Pilihan
                  </h3>
                  <p className="category-one__text">[APMP]</p>
                </div>
              </div>
              <div className="category-one__hover">
                <div className="category-one__hover__thumb">
                  <img
                    src="assets/images/category/category-hover-2.png"
                    alt="eduact"
                  />
                </div>
                <div className="category-one__hover__content">
                  <div className="category-one__hover__icon">
                    <span className="icon-Technology"></span>
                  </div>
                  <h3 className="category-one__hover__title">
                    <a href="https://psikologi.edubrand.id" target="_blank">
                      Asesmen Pemetaan Mata Pelajaran Pilihan
                    </a>
                  </h3>
                  <p className="category-one__hover__text">[APMP]</p>
                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="category-one__item">
              <div
                className="category-one__wrapper"
                style={{
                  backgroundImage:
                    "url(assets/images/shapes/category-shape.png)",
                }}
              >
                <div className="category-one__thumb">
                  <img
                    src="assets/images/category/category-normal-3.png"
                    alt="eduact"
                  />
                </div>
                <div className="category-one__content">
                  <div className="category-one__icon">
                    <span className="icon-Digital-marketing"></span>
                  </div>
                  <h3 className="category-one__title">
                    Penguatan Pembelajaran Literasi & Numerasi
                  </h3>
                  <p className="category-one__text">[SIMULASI ANBK]</p>
                </div>
              </div>
              <div className="category-one__hover">
                <div className="category-one__hover__thumb">
                  <img
                    src="assets/images/category/category-hover-3.png"
                    alt="eduact"
                  />
                </div>
                <div className="category-one__hover__content">
                  <div className="category-one__hover__icon">
                    <span className="icon-Digital-marketing"></span>
                  </div>
                  <h3 className="category-one__hover__title">
                    <a href="https://anbk.edubrand.id" target="_blank">
                      Penguatan Pembelajaran Literasi & Numerasi
                    </a>
                  </h3>
                  <p className="category-one__hover__text">[SIMULASI ANBK]</p>
                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="category-one__item">
              <div
                className="category-one__wrapper"
                style={{
                  backgroundImage:
                    "url(assets/images/shapes/category-shape.png)",
                }}
              >
                <div className="category-one__thumb">
                  <img
                    src="assets/images/category/category-normal-4.png"
                    alt="eduact"
                  />
                </div>
                <div className="category-one__content">
                  <div className="category-one__icon">
                    <span className="icon-Start-up"></span>
                  </div>
                  <h3 className="category-one__title">
                    Simulasi Ujian Tulis Berbasis Komputer
                  </h3>
                  <p className="category-one__text">[SIMULASI UTBK-SNBT]</p>
                </div>
              </div>
              <div className="category-one__hover">
                <div className="category-one__hover__thumb">
                  <img
                    src="assets/images/category/category-hover-4.png"
                    alt="eduact"
                  />
                </div>
                <div className="category-one__hover__content">
                  <div className="category-one__hover__icon">
                    <span className="icon-Start-up"></span>
                  </div>
                  <h3 className="category-one__hover__title">
                    <a href="https://snbt.edubrand.id" target="_blank">
                      Simulasi Ujian Tulis Berbasis Komputer
                    </a>
                  </h3>
                  <p className="category-one__hover__text">
                    [SIMULASI UTBK-SNBT]
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="category-one__item">
              <div
                className="category-one__wrapper"
                style={{
                  backgroundImage:
                    "url(assets/images/shapes/category-shape.png)",
                }}
              >
                <div className="category-one__thumb">
                  <img
                    src="assets/images/category/category-normal-5.png"
                    alt="eduact"
                  />
                </div>
                <div className="category-one__content">
                  <div className="category-one__icon">
                    <span className="icon-Start-up"></span>
                  </div>
                  <h3 className="category-one__title">
                    Penguatan Asesmen Kompetensi Madrasah Indonesia
                  </h3>
                  <p className="category-one__text">[SIMULASI AKMI]</p>
                </div>
              </div>
              <div className="category-one__hover">
                <div className="category-one__hover__thumb">
                  <img
                    src="assets/images/category/category-hover-5.png"
                    alt="eduact"
                  />
                </div>
                <div className="category-one__hover__content">
                  <div className="category-one__hover__icon">
                    <span className="icon-Start-up"></span>
                  </div>
                  <h3 className="category-one__hover__title">
                    <a href="https://akmi.edubrand.id" target="_blank">
                      Penguatan Asesmen Kompetensi Madrasah Indonesia
                    </a>
                  </h3>
                  <p className="category-one__hover__text">[SIMULASI AKMI]</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default CategorySection;
