import { FunctionComponent } from "react";
// import classNames from 'classnames'
// import ServiceImageWrapper from '@assets/icons/eduact/service-icon-wrapper.svg'

const ServiceSection: FunctionComponent = () => (
  <section className="service-one" id="services">
    <div
      className="service-one__bg"
      style={{ backgroundImage: "url(assets/images/shapes/service-bg-1.png)" }}
    ></div>
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="100ms">
          <div className="service-one__item">
            <div className="service-one__wrapper">
              <div className="service-one__icon">
                <span className="icon-education"></span>
              </div>
              <h3 className="service-one__title">
                <a href="team.html">Data Akurat</a>
              </h3>
              <p className="service-one__text">
                Satuan Pendidikan memerlukan data akurat lulusan/alumni, yang
                tersistem dengan baik.
              </p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 118 129"
                fill="none"
              >
                <path
                  d="M0.582052 143.759C135.395 113.682 145.584 0.974413 145.584 0.974413L173.881 89.6286C173.881 89.6286 0.582054 322.604 0.582052 143.759Z"
                  fill="#F1F2FD"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="200ms">
          <div className="service-one__item">
            <div className="service-one__wrapper">
              <div className="service-one__icon">
                <span className="icon-business"></span>
              </div>
              <h3 className="service-one__title">
                <a href="team-become.html">Sebaran Alumni</a>
              </h3>
              <p className="service-one__text">
                Satuan Pendidikan memerlukan data sebaran alumni, dalam
                meningkatkan Indeks Satuan Pendidikan di jalur SNBP
              </p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 118 129"
                fill="none"
              >
                <path
                  d="M0.582052 143.759C135.395 113.682 145.584 0.974413 145.584 0.974413L173.881 89.6286C173.881 89.6286 0.582054 322.604 0.582052 143.759Z"
                  fill="#F1F2FD"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="300ms">
          <div className="service-one__item">
            <div className="service-one__wrapper">
              <div className="service-one__icon">
                <span className="icon-webinar"></span>
              </div>
              <h3 className="service-one__title">
                <a href="course.html">Masukan Alumni</a>
              </h3>
              <p className="service-one__text">
                Satuan Pendidikan membutuhkan masukan dari alumni, bagi
                peningkatan mutu Satuan Pendidikan
              </p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 118 129"
                fill="none"
              >
                <path
                  d="M0.582052 143.759C135.395 113.682 145.584 0.974413 145.584 0.974413L173.881 89.6286C173.881 89.6286 0.582054 322.604 0.582052 143.759Z"
                  fill="#F1F2FD"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="400ms">
          <div className="service-one__item">
            <div className="service-one__wrapper">
              <div className="service-one__icon">
                <span className="icon-neural"></span>
              </div>
              <h3 className="service-one__title">
                <a href="about.html">Network Alumni</a>
              </h3>
              <p className="service-one__text">
                Satuan Pendidikan perlu membangun network alumni, berkolaborasi
                meningkatkan mutu satuan pendidikan
              </p>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 118 129"
                fill="none"
              >
                <path
                  d="M0.582052 143.759C135.395 113.682 145.584 0.974413 145.584 0.974413L173.881 89.6286C173.881 89.6286 0.582054 322.604 0.582052 143.759Z"
                  fill="#F1F2FD"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  // <section className="service-two" style={{backgroundImage: "url(assets/images/shapes/service-bg-2.jpg)"}} id="services">
  //   <div className="container">
  //     <div className="text-center section-title wow fadeInUp" data-wow-delay="100ms">
  //       <h5 className="section-title__tagline">
  //         Mengapa perlunya Tracer Study?
  //         <svg className="arrow-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55 13">
  //           <g clipPath="url(#clip0_324_36194)">
  //             <path d="M10.5406 6.49995L0.700562 12.1799V8.56995L4.29056 6.49995L0.700562 4.42995V0.819946L10.5406 6.49995Z" />
  //             <path d="M25.1706 6.49995L15.3306 12.1799V8.56995L18.9206 6.49995L15.3306 4.42995V0.819946L25.1706 6.49995Z" />
  //             <path d="M39.7906 6.49995L29.9506 12.1799V8.56995L33.5406 6.49995L29.9506 4.42995V0.819946L39.7906 6.49995Z" />
  //             <path d="M54.4206 6.49995L44.5806 12.1799V8.56995L48.1706 6.49995L44.5806 4.42995V0.819946L54.4206 6.49995Z" />
  //           </g>
  //         </svg>
  //       </h5>
  //       <h2 className="section-title__title">Dalam Meningkatkan Mutu<br /> Satuan Pendidikan </h2>
  //     </div>
  //     <div className="row">
  //       <div className="col-xl-3 col-md-6 wow fadeInUp" data-wow-delay="200ms">
  //         <div className="text-center service-two__item">
  //           <div className="service-two__wrapper">
  //             <svg viewBox="0 0 303 117" fill="#F6F6F6" xmlns="http://www.w3.org/2000/svg">
  //               <circle cx="151" cy="-129" r="246" />
  //             </svg>
  //             <div className="service-two__icon">
  //               <span className="icon-education"></span>
  //             </div>
  //             <h3 className="service-two__title">
  //               <a className='no-underline cursor-pointer'>Data Akurat</a>
  //             </h3>
  //             <p className="service-two__text">Satuan Pendidikan memerlukan data akurat lulusan/alumni, yang tersistem dengan baik, dan menggunakan platform yang akurat</p>
  //             <a className="no-underline cursor-pointer service-two__rm"><span className=""></span></a>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="col-xl-3 col-md-6 wow fadeInUp" data-wow-delay="300ms">
  //         <div className="text-center service-two__item">
  //           <div className="service-two__wrapper">
  //             <svg viewBox="0 0 303 117" fill="#F6F6F6" xmlns="http://www.w3.org/2000/svg">
  //               <circle cx="151" cy="-129" r="246" />
  //             </svg>
  //             <div className="service-two__icon">
  //               <span className="icon-business"></span>
  //             </div>
  //             <h3 className="service-two__title">
  //               <a className='no-underline cursor-pointer'>Sebaran Alumni</a>
  //             </h3>
  //             <p className="service-two__text">Satuan Pendidikan memerlukan data sebaran alumni yang melanjutkan ke perguruan tinggi, dalam meningkatkan Indeks Satuan Pendidikan di jalur SNBP</p>
  //             <a className="no-underline cursor-pointer service-two__rm"><span className=""></span></a>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="col-xl-3 col-md-6 wow fadeInUp" data-wow-delay="400ms">
  //         <div className="text-center service-two__item">
  //           <div className="service-two__wrapper">
  //             <svg viewBox="0 0 303 117" fill="#F6F6F6" xmlns="http://www.w3.org/2000/svg">
  //               <circle cx="151" cy="-129" r="246" />
  //             </svg>
  //             <div className="service-two__icon">
  //               <span className="icon-webinar"></span>
  //             </div>
  //             <h3 className="service-two__title">
  //               <a className='no-underline cursor-pointer'>Masukan Alumni</a>
  //             </h3>
  //             <p className="service-two__text">Satuan Pendidikan membutuhkan masukan/informasi dari alumni, bagi pengembangan dan peningkatan mutu Satuan Pendidikan</p>
  //             <a className="no-underline cursor-pointer service-two__rm"><span className=""></span></a>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="col-xl-3 col-md-6 wow fadeInUp" data-wow-delay="500ms">
  //         <div className="text-center service-two__item">
  //           <div className="service-two__wrapper">
  //             <svg viewBox="0 0 303 117" fill="#F6F6F6" xmlns="http://www.w3.org/2000/svg">
  //               <circle cx="151" cy="-129" r="246" />
  //             </svg>
  //             <div className="service-two__icon">
  //               <span className="icon-neural"></span>
  //             </div>
  //             <h3 className="service-two__title">
  //               <a className='no-underline cursor-pointer'>Network Alumni</a>
  //             </h3>
  //             <p className="service-two__text">Satuan Pendidikan perlu membangun jaringan/network alumni, dalam rangka berkolaborasi meningkatkan mutu satuan pendidikan</p>
  //             <a className="no-underline cursor-pointer service-two__rm"><span className=""></span></a>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </section>
);

export default ServiceSection;
