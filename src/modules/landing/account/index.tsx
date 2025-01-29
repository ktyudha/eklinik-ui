import { FunctionComponent } from "react";
import useGlobalStore from "@/store/useStore";
import { formattedDate } from "@/helpers/date";

const LandingAccount: FunctionComponent = () => {
  const { user } = useGlobalStore((state) => ({
    user: state.user,
  }));

  return (
    <>
      <section className="md:mx-auto bg-white min-h-screen  max-w-screen-xl pb-24">
        <div className="justify-center mx-auto text-center bg-white pt-10">
          <span className="text-4xl font-medium bg-base-200 rounded-full text-gray-500 p-4">
            {user?.name.slice(0, 2).toUpperCase()}
          </span>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 uppercase mb-1">
              {user?.name}
            </h2>
            <p className="text-sm text-gray-600">{user?.email}</p>
          </div>
        </div>

        <div className="mt-6 md:text-base text-sm">
          <div className="grid md:grid-cols-4 grid-cols-2 gap-x-4 gap-y-3 mx-4 md:px-4">
            <div className="w-full">
              <div className="text-gray-600">NRM</div>
              <div className="bg-gray-50 px-2 py-1 rounded-md">
                {user?.medical_record_number}
              </div>
            </div>
            <div className="w-full">
              <div className="text-gray-600">NIK</div>
              <div className="bg-gray-50 px-2 py-1 rounded-md">{user?.nik}</div>
            </div>
            <div className="w-full">
              <div className="text-gray-600">Username</div>
              <div className="bg-gray-50 px-2 py-1 rounded-md">
                {user?.username}
              </div>
            </div>
            <div className="w-full">
              <div className="text-gray-600">Status</div>
              <div className="bg-gray-50 px-2 py-1 rounded-md">
                {user?.marital_status}
              </div>
            </div>
            <div className="w-full">
              <div className="text-gray-600">Tempat Lahir</div>
              <div className=" bg-gray-50 px-2 py-1 rounded-md">
                {user?.birth_place}
              </div>
            </div>
            <div className="w-full">
              <div className="text-gray-600">Tanggal Lahir</div>
              <div className="bg-gray-50 px-2 py-1 rounded-md">
                {formattedDate(user?.birth_date as string)}
              </div>
            </div>
            <div className="w-full">
              <div className="text-gray-600">Jenis Kelamin</div>
              <div className="bg-gray-50 px-2 py-1 rounded-md">
                {user?.gender}
              </div>
            </div>
            <div className="w-full">
              <div className="text-gray-600">Agama</div>
              <div className="bg-gray-50 px-2 py-1 rounded-md">
                {user?.religion}
              </div>
            </div>
            <div className="w-full">
              <div className="text-gray-600">Pendidikan</div>
              <div className="bg-gray-50 px-2 py-1 rounded-md">
                {user?.education}
              </div>
            </div>
            <div className="w-full">
              <div className="text-gray-600">Pekerjaan</div>
              <div className="bg-gray-50 px-2 py-1 rounded-md">{user?.job}</div>
            </div>
            <div className="w-full">
              <div className="text-gray-600">Provinsi</div>
              <div className="bg-gray-50 px-2 py-1 rounded-md">
                {user?.province?.name}
              </div>
            </div>
            <div className="w-full">
              <div className="text-gray-600">Kabupaten/Kota</div>
              <div className="bg-gray-50 px-2 py-1 rounded-md">
                {user?.city?.name}
              </div>
            </div>
            <div className="w-full">
              <div className="text-gray-600">Kecamatan</div>
              <div className="bg-gray-50 px-2 py-1 rounded-md">
                {user?.sub_district?.name}
              </div>
            </div>
            <div className="w-full">
              <div className="text-gray-600">Desa</div>
              <div className="bg-gray-50 px-2 py-1 rounded-md">
                {user?.village?.name}
              </div>
            </div>
            <div className="w-full">
              <div className="text-gray-600">Kode Pos</div>
              <div className="bg-gray-50 px-2 py-1 rounded-md">
                {user?.village?.postal_code}
              </div>
            </div>
            {user?.additional_address && (
              <div className="col-span-2">
                <div className="text-gray-600">Alamat</div>
                <div className="bg-gray-50 px-2 py-1 rounded-md">
                  {user?.additional_address}, <br />
                  {user?.village?.name}, {user?.sub_district?.name},{" "}
                  {user?.city?.name}, {user?.province?.name}, Kode Pos {""}
                  {user?.village?.postal_code}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingAccount;
