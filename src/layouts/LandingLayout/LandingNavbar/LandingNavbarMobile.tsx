import { FunctionComponent } from "react";
// import { NavLink } from "react-router-dom";
import Logo from "@/assets/logo/siloam.png";

const LandingNavbarMobile: FunctionComponent = () => {
  return (
    <div className="drawer-side top-9">
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu light bg-white text-base-content min-h-full w-full p-3.5 gap-2">
        {/* Sidebar content here */}
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="flex justify-between">
          <a
            href=""
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={Logo} className="md:h-12 h-8" alt="Flowbite Logo" />
            {/* <span className="self-center text-2xl font-semibold whitespace-nowrap ">
              Klinik Pintar
            </span> */}
          </a>
          <div className="drawer-content text-end">
            <label
              htmlFor="my-drawer"
              className="inline-flex items-center p-2 w-8 h-8 justify-center text-sm text-gray-900 rounded-lg md:hidden drawer-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="bi bi-x-lg w-5 h-5"
                viewBox="0 0 16 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"
                />
              </svg>
            </label>
          </div>
        </div>
        <div className="relative my-3 md:hidden px-2.5">
          <div className="absolute inset-y-0 start-0 flex items-center ps-6 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-900"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="search-navbar"
            className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
            placeholder="Cari di Klinik"
          />
        </div>
        <li className="border-b pb-2">
          <a className="flex justify-between">
            Antrian
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-chevron-right w-4 h-4 text-[#4bb43a]"
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
        </li>
        <li className="border-b pb-2">
          <a className="flex justify-between">
            Layanan Kesehatan
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-chevron-right w-4 h-4 text-[#4bb43a]"
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
        </li>
        <li className="border-b pb-2">
          <a className="flex justify-between">
            Pusat Informasi
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-chevron-right w-4 h-4 text-[#4bb43a]"
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
        </li>
      </ul>
    </div>
  );
};

export default LandingNavbarMobile;
