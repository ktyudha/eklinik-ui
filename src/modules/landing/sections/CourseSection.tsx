import { FunctionComponent } from "react";

const CourseSection: FunctionComponent = () => (
  <>
    <section
      className="course-one"
      style={{ backgroundImage: "url(assets/images/shapes/course-bg-1.png)" }}
      id="course"
    >
      <div className="container">
        <div className="section-title text-center">
          <h5 className="section-title__tagline">
            Fitur & Keunggulan
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
          <h2 className="section-title__title">
            Platform Tracer Study Edubrand dengan Fitur & Report terlengkap !!!
          </h2>
        </div>
        <div className="row">
          <div
            className="col-xl-4 col-lg-6 wow fadeInUp"
            data-wow-delay="100ms"
          >
            <div className="course-one__item">
              <div className="course-one__thumb">
                <img src="assets/images/course/course-1-1.png" alt="eduact" />
                <a className="course-one__like" href="">
                  <span className="icon-like"></span>
                </a>
              </div>

              <div className="course-one__content">
                <div className="course-one__time">FITUR-01</div>
                <div className="course-one__ratings">
                  <span className="icon-star"></span>
                  <span className="icon-star"></span>
                  <span className="icon-star"></span>
                  <span className="icon-star"></span>
                  <span className="icon-star"></span>
                  <div className="course-one__ratings__reviews">
                    (105 Reviews)
                  </div>
                </div>
                <h3 className="course-one__title">
                  <a>Manajemen Database Alumni/Lulusan</a>
                </h3>
                <div className="course-one__bottom">
                  <div className="course-one__author">
                    <img src="assets/images/course/author-1.png" alt="eduact" />
                    <h5 className="course-one__author__name">Alumni/Lulusan</h5>
                    <p className="course-one__author__designation">
                      5 periode Angkatan
                    </p>
                  </div>
                  <div className="course-one__meta">
                    <h4 className="course-one__meta__price">5</h4>
                    <p className="course-one__meta__className">Angkatan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-4 col-lg-6 wow fadeInUp"
            data-wow-delay="200ms"
          >
            <div className="course-one__item">
              <div className="course-one__thumb">
                <img src="assets/images/course/course-1-2.png" alt="eduact" />
                <a className="course-one__like" href="">
                  <span className="icon-like"></span>
                </a>
              </div>

              <div className="course-one__content">
                <div className="course-one__time">FITUR-02</div>
                <div className="course-one__ratings">
                  <span className="icon-star"></span>
                  <span className="icon-star"></span>
                  <span className="icon-star"></span>
                  <span className="icon-star"></span>
                  <span className="icon-star"></span>
                  <div className="course-one__ratings__reviews">
                    (85 Reviews)
                  </div>
                </div>
                <h3 className="course-one__title">
                  <a>
                    Statistik Data Alumni/Lulusan Melanjutkan Studi Dalam Negeri
                  </a>
                </h3>
                <div className="course-one__bottom">
                  <div className="course-one__author">
                    <img src="assets/images/course/author-2.png" alt="eduact" />
                    <h5 className="course-one__author__name">
                      Melanjutkan Studi
                    </h5>
                    <p className="course-one__author__designation">
                      Dalam Negeri
                    </p>
                  </div>
                  <div className="course-one__meta">
                    <h4 className="course-one__meta__price">4.523</h4>
                    <p className="course-one__meta__className">Kampus</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-4 col-lg-6 wow fadeInUp"
            data-wow-delay="300ms"
          >
            <div className="course-one__item">
              <div className="course-one__thumb">
                <img src="assets/images/course/course-1-3.png" alt="eduact" />
                <a className="course-one__like" href="">
                  <span className="icon-like"></span>
                </a>
              </div>

              <div className="course-one__content">
                <div className="course-one__time">FITUR-03</div>
                <div className="course-one__ratings">
                  <span className="icon-star"></span>
                  <span className="icon-star"></span>
                  <span className="icon-star"></span>
                  <span className="icon-star"></span>
                  <span className="icon-star"></span>
                  <div className="course-one__ratings__reviews">
                    (25 Reviews)
                  </div>
                </div>
                <h3 className="course-one__title">
                  <a>
                    Statistik Data Alumni/Lulusan Melanjutkan Studi Luar Negeri
                  </a>
                </h3>
                <div className="course-one__bottom">
                  <div className="course-one__author">
                    <img src="assets/images/course/author-3.png" alt="eduact" />
                    <h5 className="course-one__author__name">
                      Melanjutkan Studi
                    </h5>
                    <p className="course-one__author__designation">
                      Luar Negeri
                    </p>
                  </div>
                  <div className="course-one__meta">
                    <h4 className="course-one__meta__price">478</h4>
                    <p className="course-one__meta__className">Kampus</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-4 col-lg-6 wow fadeInUp"
            data-wow-delay="400ms"
          >
            <div className="course-one__item">
              <div className="course-one__thumb">
                <img src="assets/images/course/course-1-4.png" alt="eduact" />
                <a className="course-one__like" href="">
                  <span className="icon-like"></span>
                </a>
              </div>

              <div className="course-one__content">
                <div className="course-one__time">FITUR-04</div>
                <div className="course-one__ratings">
                  <span className="icon-star"></span>
                  <span className="icon-star"></span>
                  <span className="icon-star"></span>
                  <span className="icon-star"></span>
                  <span className="icon-star"></span>
                  <div className="course-one__ratings__reviews">
                    (88 Reviews)
                  </div>
                </div>
                <h3 className="course-one__title">
                  <a>
                    Statistik Data Alumni/Lulusan memilih Prodi Dalam Negeri
                  </a>
                </h3>
                <div className="course-one__bottom">
                  <div className="course-one__author">
                    <img src="assets/images/course/author-4.png" alt="eduact" />
                    <h5 className="course-one__author__name">Program Studi</h5>
                    <p className="course-one__author__designation">
                      Dalam Negeri
                    </p>
                  </div>
                  <div className="course-one__meta">
                    <h4 className="course-one__meta__price">31.399</h4>
                    <p className="course-one__meta__className">Program Studi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-4 col-lg-6 wow fadeInUp"
            data-wow-delay="500ms"
          >
            <div className="course-one__item">
              <div className="course-one__thumb">
                <img src="assets/images/course/course-1-5.png" alt="eduact" />
                <a className="course-one__like" href="">
                  <span className="icon-like"></span>
                </a>
              </div>

              <div className="course-one__content">
                <div className="course-one__time">FITUR-05</div>
                <div className="course-one__ratings">
                  <span className="icon-star"></span>
                  <span className="icon-star"></span>
                  <span className="icon-star"></span>
                  <span className="icon-star"></span>
                  <span className="icon-star"></span>
                  <div className="course-one__ratings__reviews">
                    (46Reviews)
                  </div>
                </div>
                <h3 className="course-one__title">
                  <a>Statistik Data Alumni/Lulusan memilih Prodi Luar Negeri</a>
                </h3>
                <div className="course-one__bottom">
                  <div className="course-one__author">
                    <img src="assets/images/course/author-5.png" alt="eduact" />
                    <h5 className="course-one__author__name">Program Studi</h5>
                    <p className="course-one__author__designation">
                      Luar Negeri
                    </p>
                  </div>
                  <div className="course-one__meta">
                    <h4 className="course-one__meta__price">1.528</h4>

                    <p className="course-one__meta__className">Program Studi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-xl-4 col-lg-6 wow fadeInUp"
            data-wow-delay="600ms"
          >
            <div className="course-one__item">
              <div className="course-one__thumb">
                <img src="assets/images/course/course-1-6.png" alt="eduact" />
                <a className="course-one__like" href="">
                  <span className="icon-like"></span>
                </a>
              </div>

              <div className="course-one__content">
                <div className="course-one__time">FITUR-06</div>
                <div className="course-one__ratings">
                  <span className="icon-star"></span>
                  <span className="icon-star"></span>
                  <span className="icon-star"></span>
                  <span className="icon-star"></span>
                  <span className="icon-star"></span>
                  <div className="course-one__ratings__reviews">
                    (254 Reviews)
                  </div>
                </div>
                <h3 className="course-one__title">
                  <a>Statistik Data Alumni/Lulusan Bekerja/Wirausaha </a>
                </h3>
                <div className="course-one__bottom">
                  <div className="course-one__author">
                    <img src="assets/images/course/author-6.png" alt="eduact" />
                    <h5 className="course-one__author__name">
                      Bekerja/Wirausaha
                    </h5>
                    <p className="course-one__author__designation">
                      Sudah/Belum Bekerja
                    </p>
                  </div>
                  <div className="course-one__meta">
                    <h4 className="course-one__meta__price">431</h4>
                    <p className="course-one__meta__className">
                      Lapangan Kerja
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);
export default CourseSection;
