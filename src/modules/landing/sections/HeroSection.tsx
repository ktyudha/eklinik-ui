import { FunctionComponent } from "react";
// import { NavLink } from "react-router-dom";
import HeroImageMobile from "@assets/images/hero-mobile.png";
import { UilListOl } from "@iconscout/react-unicons";

const HeroSection: FunctionComponent = () => {
  return (
    <section
      className={`min-w-full md:min-h-[85vh] md:bg-hero-desktop md:bg-center md:bg-cover md:bg-no-repeat`}
      id="home"
    >
      <div className="relative md:hidden display">
        <img src={HeroImageMobile} className="bg-cover w-full" alt="" />
        <div className="absolute bottom-0 left-0 w-full h-[10vh] bg-gradient-to-t from-white"></div>
      </div>

      <div className="max-w-screen-xl mx-auto relative md:px-0 px-4">
        <div className="pt-10 md:mb-10 mb-2">
          <h1 className="md:text-base text-sm text-gray-400 font-medium md:mb-0 mb-1">
            Selamat Datang di Klinik Pintar
          </h1>
          <p className="md:text-5xl text-2xl text-gray-700 md:leading-[62px]">
            Yang berarti, <br /> segera kembali.
          </p>
        </div>

        <div className="bg-white p-6 max-w-sm rounded-lg drop-shadow-xl shadow-xl">
          <div className="flex gap-2 mb-4">
            <h3 className="text-gray-400 font-normal mr-2 my-auto">Temukan</h3>
            <div className="grid grid-cols-2 w-full gap-2">
              <button className="bg-[#4bb43a] text-white py-1.5 rounded-full my-auto w-full">
                Jadwal
              </button>
              <button className="border border-[#4bb43a] text-[#4bb43a] hover:bg-[#4bb43a] hover:text-white py-1.5 rounded-full my-auto">
                Lokasi
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-xs">
              <thead>
                <tr>
                  <th>Hari</th>
                  <th>Waktu</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Senin, 20 Januari 2025</td>
                  <td>
                    <p>05:00-07:00 WIB</p>
                    <p>16:00-20:00 WIB</p>
                  </td>
                </tr>
                <tr>
                  <td>Selasa, 21 Januari 2025</td>
                  <td>
                    {/* <p>05:00-07:00 WIB</p>
                    <p>16:00-20:00 WIB</p> */}
                    Libur
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-auto md:pt-20 pt-5">
          <div className="md:bg-white text-center rounded-lg md:p-6 cursor-pointer">
            <a className="md:flex md:justify-between text-center my-auto">
              <div className="md:flex">
                <div className="md:bg-transparent bg-white md:py-0 py-5 rounded drop-shadow-lg">
                  <UilListOl
                    color="#1c2674"
                    size={35}
                    className="text-center mx-auto"
                  />
                </div>
                <span className="my-auto md:flex gap-x-3 md:text-base text-center mx-auto text-xs md:ml-4">
                  Ambil Antrian
                </span>
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
                <div className="md:bg-transparent bg-white md:py-0 py-5 rounded drop-shadow-lg">
                  <UilListOl
                    color="#1c2674"
                    size={35}
                    className="text-center mx-auto"
                  />
                </div>
                <span className="my-auto md:flex md:text-base text-center mx-auto text-xs md:ml-4">
                  Layanan
                </span>
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
                <div className="md:bg-transparent bg-white md:py-0 py-5 rounded drop-shadow-lg">
                  <UilListOl
                    color="#1c2674"
                    size={35}
                    className="text-center mx-auto"
                  />
                </div>
                <span className="my-auto md:flex gap-x-3 md:text-base text-center mx-auto text-xs md:ml-4">
                  Informasi Klinik
                </span>
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
                <div className="md:bg-transparent bg-white md:py-0 py-5 rounded drop-shadow-lg">
                  <UilListOl
                    color="#1c2674"
                    size={35}
                    className="text-center mx-auto"
                  />
                </div>
                <span className="my-auto md:flex gap-x-3 md:text-base text-center mx-auto text-xs md:ml-4">
                  Aduan
                </span>
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
