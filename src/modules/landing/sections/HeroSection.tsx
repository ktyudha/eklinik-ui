import { FunctionComponent } from "react";
// import { NavLink } from "react-router-dom";
import HeroImageMobile from "@assets/images/hero-mobile.png";
import HeroFilterSection from "./hero/HeroTab/HeroFilterSection";
import useGlobalStore from "@/store/useStore";

import {
  UilListOl,
  UilHospital,
  UilFileMedicalAlt,
  UilStethoscopeAlt,
} from "@iconscout/react-unicons";
import HeroJadwalSection from "./hero/HeroJadwalSection";
import HeroLokasiSection from "./hero/HeroLokasiSection";

const HeroSection: FunctionComponent = () => {
  const { activeHeroTab } = useGlobalStore((state) => ({
    activeHeroTab: state.activeHeroTab,
  }));
  return (
    <section
      className={`min-w-full min-h-screen md:bg-hero-desktop md:bg-center md:bg-cover md:bg-no-repeat md:relative bg-base-200`}
      id="home"
    >
      <div className="relative md:hidden display">
        <img src={HeroImageMobile} className="bg-cover w-full" alt="" />
        <div className="absolute bottom-0 left-0 w-full h-[10vh] bg-gradient-to-t from-base-200"></div>
      </div>

      <div className="max-w-screen-xl mx-auto md:min-h-[85vh] md:px-0 px-4 md:relative pb-24">
        <div className="md:pt-10 pt-4 md:mb-10 mb-4">
          <h1 className="md:text-base text-sm text-gray-400 font-medium md:mb-0 mb-1">
            Selamat Datang di Klinik Pintars
          </h1>
          <p className="md:text-5xl text-2xl text-gray-700 md:leading-[62px]">
            Yang berarti, <br /> segera kembali.
          </p>
        </div>

        <div className="bg-white p-6 max-w-sm rounded-lg drop-shadow-xl ">
          <HeroFilterSection />
          {activeHeroTab === "jadwal" ? (
            <HeroJadwalSection />
          ) : (
            <HeroLokasiSection />
          )}
        </div>

        <div className="md:grid grid-cols-4 md:gap-4 gap-6 mt-6 md:absolute bottom-10 w-full md:mb-0 hidden">
          <div className="md:bg-white text-center rounded-lg md:p-6 cursor-pointer">
            <a className="md:flex md:justify-between text-center my-auto">
              <div className="md:flex">
                <div className="md:bg-transparent bg-white md:py-0 py-4 rounded drop-shadow-lg">
                  <UilListOl
                    color="#1c2674"
                    size={35}
                    className="text-center mx-auto"
                  />
                </div>
                <p className="md:my-auto md:flex gap-x-3 md:text-base text-center mx-auto text-xs md:ml-4 mt-2">
                  Ambil Antrian
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-chevron-right w-4 h-4 text-[#4bb43a] my-auto md:block hidden"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                />
              </svg>
            </a>
          </div>
          <div className="md:bg-white text-center rounded-lg md:p-6 cursor-pointer">
            <a className="md:flex md:justify-between text-center my-auto">
              <div className="md:flex">
                <div className="md:bg-transparent bg-white md:py-0 py-4 rounded drop-shadow-lg">
                  <UilStethoscopeAlt
                    color="#1c2674"
                    size={35}
                    className="text-center mx-auto"
                  />
                </div>
                <p className="md:my-auto md:flex gap-x-3 md:text-base text-center mx-auto text-xs md:ml-4 mt-2">
                  Layanan
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-chevron-right w-4 h-4 text-[#4bb43a] my-auto md:block hidden"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                />
              </svg>
            </a>
          </div>
          <div className="md:bg-white text-center rounded-lg md:p-6 cursor-pointer">
            <a className="md:flex md:justify-between text-center my-auto">
              <div className="md:flex">
                <div className="md:bg-transparent bg-white md:py-0 py-4 rounded drop-shadow-lg">
                  <UilFileMedicalAlt
                    color="#1c2674"
                    size={35}
                    className="text-center mx-auto"
                  />
                </div>
                <p className="md:my-auto md:flex gap-x-3 md:text-base text-center mx-auto text-xs md:ml-4 mt-2">
                  Medical <br className="md:hidden block" /> Check Up
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-chevron-right w-4 h-4 text-[#4bb43a] my-auto md:block hidden"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                />
              </svg>
            </a>
          </div>
          <div className="md:bg-white text-center rounded-lg md:p-6 cursor-pointer">
            <a className="md:flex md:justify-between text-center my-auto">
              <div className="md:flex">
                <div className="md:bg-transparent bg-white md:py-0 py-4 rounded drop-shadow-lg">
                  <UilHospital
                    color="#1c2674"
                    size={35}
                    className="text-center mx-auto"
                  />
                </div>
                <p className="md:my-auto md:flex gap-x-3 md:text-base text-center mx-auto text-xs md:ml-4 mt-2">
                  Persalinan
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-chevron-right w-4 h-4 text-[#4bb43a] my-auto md:block hidden"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                />
              </svg>
            </a>
          </div>
          {/* <div className="bg-white rounded-lg p-6 cursor-pointer">
            <a className="flex justify-between my-auto">
              <span className="my-auto flex gap-3">
                <UilListOl color="#1c2674" />
                Layanan Kesehatan
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-chevron-right w-4 h-4 text-[#4bb43a] my-auto"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                />
              </svg>
            </a>
          </div>
          <div className="bg-white rounded-lg p-6 cursor-pointer">
            <a className="flex justify-between my-auto">
              <span className="my-auto flex gap-3">
                <UilListOl color="#1c2674" />
                Informasi Klinik
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-chevron-right w-4 h-4 text-[#4bb43a] my-auto"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                />
              </svg>
            </a>
          </div>
          <div className="bg-white rounded-lg p-6 cursor-pointer">
            <a className="flex justify-between my-auto">
              <span className="my-auto flex gap-3">
                <UilListOl color="#1c2674" />
                Informasi Klinik
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-chevron-right w-4 h-4 text-[#4bb43a] my-auto"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                />
              </svg>
            </a>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
