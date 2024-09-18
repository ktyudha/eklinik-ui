import { FunctionComponent } from "react";
// import { NavLink } from "react-router-dom";

const HeroSection: FunctionComponent = () => {
  return (
    <section className="hero min-h-screen" id="home">
      <div className="hero-content mx-auto text-left">
        <div className="max-w-md">
          <img
            src="/assets/images/profile/icon_yudha.png"
            className="w-20 mb-5 "
            alt=""
          />
          <h1 className="text-5xl font-bold">
            Hello,
            <br /> I'm Yudha
          </h1>
          <p className="py-6 text-xs md:text-base">
            Full Stack Developer | Network Engineer | Visual Storyteller
          </p>
          {/* <button className="btn btn-primary">Get Started</button> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
