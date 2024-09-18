import { FunctionComponent } from "react";

const VideoSection: FunctionComponent = () => {
  return (
    <section className="video-one">
      <div className="container">
        <div
          className="video-one__bg"
          style={{
            backgroundImage: "url(/assets/images/backgrounds/video-bg-1.jpg)",
          }}
        >
          <div
            className="video-one__shape"
            style={{
              backgroundImage: "url(/assets/images/shapes/video-shape-1.png)",
            }}
          ></div>
          <div
            className="video-one__shape2"
            style={{
              backgroundImage: "url(/assets/images/shapes/video-shape-2.png)",
            }}
          ></div>
          <div className="row">
            <div
              className="col-lg-6 col-md-7 wow fadeInLeft"
              data-wow-delay="200ms"
            >
              <h3 className="video-one__title">
                Arahan Kepala Dinas Pendidikan Provinsi Kalimantan Tengah
              </h3>
              <a href="contact.html" className="eduact-btn eduact-btn-second">
                <span className="eduact-btn__curve"></span>Selengkapnya
                <i className="icon-arrow"></i>
              </a>
            </div>
            <div
              className="col-lg-6 col-md-5 wow fadeInRight"
              data-wow-delay="200ms"
            >
              <div className="video-one__btn">
                <img
                  src="/assets/images/backgrounds/video-btn-bg-1.png"
                  alt="eduact"
                />
                <a
                  href="https://www.youtube.com/watch?v=ZfzBcYdoVEs"
                  className="video-popup"
                >
                  <span className="icon-play"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
