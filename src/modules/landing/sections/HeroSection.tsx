import { FunctionComponent } from "react";
// import { NavLink } from "react-router-dom";
import HeroImage from "@assets/images/hero.png";
import { UilListOl } from "@iconscout/react-unicons";

const HeroSection: FunctionComponent = () => {
  return (
    <section
      className={`min-w-full md:min-h-[85vh] min-h-[35vh] bg-center bg-cover bg-no-repeat`}
      style={{ backgroundImage: `url(${HeroImage})` }}
      id="home"
    >
      <div className="max-w-screen-xl mx-auto relative">
        <div className="pt-10 mb-10">
          <h1 className="text-base text-gray-400 font-medium">
            Selamat Datang di Klinik Pintar
          </h1>
          <p className="text-5xl text-gray-700 leading-[62px]">
            Yang berarti, <br /> segera kembali.
          </p>
        </div>

        <div className="bg-white p-6 max-w-sm rounded-lg">
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

        <div className="grid md:grid-cols-4 gap-4 mt-auto pt-20">
          <div className="bg-white rounded-lg p-6 cursor-pointer">
            <a className="flex justify-between my-auto">
              <span className="my-auto flex gap-3">
                <UilListOl color="#1c2674" />
                Ambil Antrian
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
