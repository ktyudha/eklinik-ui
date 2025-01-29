import { FunctionComponent } from "react";
// import ToggleThemeNavbar from "./ToggleThemeNavbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useLogout } from "@/services/auth/login/hooks/useLogout";
import useGlobalStore from "@/store/useStore";
import Logo from "@/assets/logo/siloam.png";
import Icon from "@/components/reusable/Icon";
import LandingNavbarMobile from "./LandingNavbarMobile";

const LandingNavbar: FunctionComponent = () => {
  const navigate = useNavigate();
  // const { isLoggedIn, setIsLoggedIn } = useGlobalStore(
  //   (state) => state.isLoggedIn,
  //   state.setIsLoggedIn
  // );

  const { userRole, isLoggedIn, setIsLoggedIn } = useGlobalStore((state) => ({
    userRole: state.userRole,
    isLoggedIn: state.isLoggedIn,
    setIsLoggedIn: state.setIsLoggedIn,
  }));

  const onHandleLogout = async () => {
    const { data, error } = await useLogout();
    if (data || error) {
      if (data) {
        if (userRole === "patient") {
          Cookies.remove("token-patient");
          setIsLoggedIn(false);
          // location.replace(`${config.BASE_STUDENT_URL}/login`)
        }
        navigate("/", { replace: true });
      } else {
        toast.error("Logout Gagal", {
          position: toast.POSITION.TOP_CENTER,
          data: {
            text: error,
          },
        });
      }
    }
  };
  return (
    <header className="main-header sticky top-0 w-full z-30">
      <nav className="bg-[#1c2674] border-gray-20 text-white flex justify-center py-2.5 md:gap-9 gap-4">
        <a
          href="https://api.whatsapp.com/send/?phone=6285745635740&text=Halo Klinik, Saya ingin konsultasi.&app_sent=0"
          target="_blank"
          className="font-semibold md:text-sm text-xs flex gap-2"
        >
          <Icon name="whatsapp" />
          WhatsApp
        </a>
        <a href="" className="font-semibold md:text-sm text-xs flex gap-2">
          <Icon name="hubungi-kami" />
          Hubungi Kami
        </a>
        <hr className="h-[16px] my-auto border" />
        {isLoggedIn ? (
          <button
            onClick={() => onHandleLogout()}
            className="font-semibold md:text-sm text-xs flex gap-2"
          >
            <Icon
              name="arrow-left"
              className="bg-red-500 rounded-full my-auto rotate-180"
            />
            Keluar
          </button>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              type="button"
              className="font-semibold md:text-sm text-xs flex gap-2"
            >
              <Icon
                name="arrow-left"
                className="bg-yellow-300 rounded-full my-auto"
              />
              Masuk/Daftar
            </button>
          </>
        )}
      </nav>

      <nav className="bg-white border-b border-gray-200 z-50">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-3">
          <button
            className="flex items-center space-x-3 rtl:space-x-reverse"
            onClick={() => navigate("/")}
          >
            <img src={Logo} className="md:h-12 h-8" alt="Flowbite Logo" />
            {/* <span className="self-center text-2xl font-semibold whitespace-nowrap ">
              Klinik Pintar
            </span> */}
          </button>
          <div className="flex md:order-2">
            <label
              htmlFor="modal_search"
              className="md:hidden text-gray-900 d focus:outline-none focus:ring-4 focus:ring-gray-200  rounded-lg text-sm p-2.5 me-1"
            >
              <svg
                className="w-4 h-4"
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
            </label>

            <input type="checkbox" id="modal_search" className="modal-toggle" />
            <div className="modal" role="dialog">
              <div className="modal-box ">
                <div className="relative md:hidden px-2.5">
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
              </div>
              <label className="modal-backdrop" htmlFor="modal_search">
                Close
              </label>
            </div>
            {/* <button
              type="button"
              data-collapse-toggle="navbar-search"
              aria-controls="navbar-search"
              aria-expanded="false"
              className="md:hidden text-gray-900 d hover:bg-gray-100  focus:outline-none focus:ring-4 focus:ring-gray-200  rounded-lg text-sm p-2.5 me-1"
            >
              <svg
                className="w-4 h-4"
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
              <span className="sr-only">Search</span>
            </button> */}
            <div className="relative hidden md:block">
              <input
                type="text"
                id="search-navbar"
                className="block w-md p-2 pe-10 text-sm text-gray-900 rounded-lg bg-gray-100 focus:outline-none placeholder:text-slate-600"
                placeholder="Cari di Klinik"
              />

              <button
                type="submit"
                className="absolute inset-y-0 end-0 flex my-auto items-center pe-3 "
              >
                <svg
                  className="w-4 h-4 text-[#4bb43a] "
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
                <span className="sr-only">Search icon</span>
              </button>
            </div>
            <div className="drawer">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content my-auto">
                <label
                  htmlFor="my-drawer"
                  className="inline-flex items-center p-2 w-8 h-8 justify-center text-sm text-gray-900 rounded-lg md:hidden drawer-button"
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 17 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 1h15M1 7h15M1 13h15"
                    />
                  </svg>
                </label>
              </div>
              <LandingNavbarMobile />
            </div>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-search"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-normal md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 ">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-600 hover:border-b hover:border-b-[#4bb43a] md:bg-transparent md:p-0"
                >
                  Antrian
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-600 hover:border-b hover:border-b-[#4bb43a] md:bg-transparent md:p-0"
                >
                  Layanan Kesehatan
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-600 hover:border-b hover:border-b-[#4bb43a] md:bg-transparent md:p-0"
                >
                  Pusat Informasi
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default LandingNavbar;
