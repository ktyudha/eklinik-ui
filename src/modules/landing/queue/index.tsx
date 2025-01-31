import { FunctionComponent } from "react";

const LandingQueue: FunctionComponent = () => {
  return (
    <>
      <section className="md:mx-auto bg-white max-w-md">
        <div className="mx-4 md:px-4 pt-4">
          {/* Card */}
          <div className="relative text-center bg-[#4bb43a] text-white py-8 mb-4 rounded-xl before:content-[''] after:content-[''] before:w-6 before:h-6 after:w-6 after:h-6 before:bg-white after:bg-white before:rounded-full after:rounded-full before:absolute after:absolute before:top-1/2 after:top-1/2 before:-left-3 after:-right-3 before:-translate-y-1/2 after:-translate-y-1/2">
            <h5 className="uppercase text-sm">Nomor Antrian Saat Ini</h5>
            <p className="text-4xl font-semibold tracking-wider">Q001</p>
          </div>

          {/* Card Now */}
          <div className="relative text-center bg-gray-100 py-8 rounded-xl before:content-[''] after:content-[''] before:w-6 before:h-6 after:w-6 after:h-6 before:bg-white after:bg-white before:rounded-full after:rounded-full before:absolute after:absolute before:bottom-[22.5%] after:bottom-[22.5%] before:-left-3 after:-right-3 before:-translate-y-[20%] after:-translate-y-[20%]">
            <div className="mb-4">
              <label className="uppercase text-sm text-[#4bb43a]">Pasien</label>
              <h5 className="uppercase text-lg font-semibold">
                Kurniawan Try Yudha
              </h5>
              <span className="text-sm font-medium tracking-wider">
                Jumat, 07 Januari 2025 09:17 WIB
              </span>
            </div>

            <div className="mb-4">
              <label className="uppercase text-sm text-[#4bb43a]">
                Keluhan
              </label>
              <h5 className="capitalize text-lg font-semibold">Sakit Mata</h5>
            </div>

            <div className="mb-8">
              <label className="uppercase text-sm text-[#4bb43a]">
                Nomor Antrian
              </label>
              <p className="text-6xl font-bold tracking-wider">Q009</p>
            </div>

            <div className="mx-8">
              <button className="bg-red-500 text-white w-full py-3 rounded-lg">
                Batalkan
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingQueue;
