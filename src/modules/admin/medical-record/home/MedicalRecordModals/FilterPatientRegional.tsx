// import { FunctionComponent, useState, useEffect } from "react";
// import useGetAllProvince from "@/services/global/region/province/hooks/useGetAllProvince";
// import useGetProvince from "@/services/global/region/province/hooks/useGetProvince";
// import useGetCity from "@/services/global/region/city/hooks/useGetCity";
// import useMapInputOptions from "@/hooks/useMapInputOptions";

// const FilterPatientRegional: FunctionComponent = () => {
//   const [selectedProvince, setSelectedProvince] = useState("");
//   const [selectedCity, setSelectedCity] = useState("");
//   const [selectSubDistrict, setSelectedSubDistrict] = useState("");

//   const { provinces } = useGetAllProvince();
//   const { province } = useGetProvince(selectedProvince || "");
//   const { city } = useGetCity(selectedCity || "");

//   const provinceOptions = useMapInputOptions(provinces);
//   const cityOptions = useMapInputOptions(province?.cities);
//   const subDistrictOptions = useMapInputOptions(city?.sub_districts);

//   useEffect(() => {
//     setSelectedCity("");
//     setSelectedSubDistrict("");
//   }, [selectedProvince]);

//   return (
//     <>
//       <div className="flex flex-col">
//         <label
//           htmlFor={"province_id"}
//           className="flex gap-1 font-normal text-md leading-4 text-[#1E293B] mb-2"
//         >
//           Provinsi <div className="text-red-500">*</div>
//         </label>
//         <select
//           className="flex gap-1 border-2 py-2 px-3 rounded-lg outline-none bg-white"
//           name="province_id"
//           value={selectedProvince as string}
//           onChange={(e) => setSelectedProvince(e.target.value)}
//         >
//           <option value="" selected>
//             Pilih Provinsi
//           </option>
//           {provinceOptions.map((data, idx) => (
//             <option key={`option-item-${idx}`} value={data.value}>
//               {data.label}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="flex flex-col">
//         <label
//           htmlFor={"city_id"}
//           className="flex gap-1 font-normal text-md leading-4 text-[#1E293B] mb-2"
//         >
//           Kabupaten/Kota <div className="text-red-500">*</div>
//         </label>
//         <select
//           className="flex gap-1 border-2 py-2 px-3 rounded-lg outline-none bg-white"
//           name="city_id"
//           value={selectedCity as string}
//           onChange={(e) => setSelectedCity(e.target.value)}
//         >
//           <option value="" selected>
//             Pilih Kabupaten/Kota
//           </option>
//           {cityOptions?.map((data, idx) => (
//             <option key={`option-item-${idx}`} value={data.value}>
//               {data.label}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="flex flex-col">
//         <label
//           htmlFor={"city_id"}
//           className="flex gap-1 font-normal text-md leading-4 text-[#1E293B] mb-2"
//         >
//           Kecamatan <div className="text-red-500">*</div>
//         </label>
//         <select
//           className="flex gap-1 border-2 py-2 px-3 rounded-lg outline-none bg-white"
//           name="city_id"
//           value={selectSubDistrict as string}
//           onChange={(e) => setSelectedSubDistrict(e.target.value)}
//         >
//           <option value="" selected>
//             Pilih Kecamatan
//           </option>
//           {subDistrictOptions?.map((data, idx) => (
//             <option key={`option-item-${idx}`} value={data.value}>
//               {data.label}
//             </option>
//           ))}
//         </select>
//       </div>
//     </>
//   );
// };
// export default FilterPatientRegional;

import { FunctionComponent, useState, useEffect } from "react";
import useGetAllProvince from "@/services/global/region/province/hooks/useGetAllProvince";
import useGetProvince from "@/services/global/region/province/hooks/useGetProvince";
import useGetCity from "@/services/global/region/city/hooks/useGetCity";
import useMapInputOptions from "@/hooks/useMapInputOptions";
import Select from "@/components/reusable/Form/Select"; // Assuming Select is in the components folder

const FilterPatientRegional: FunctionComponent = () => {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectSubDistrict, setSelectedSubDistrict] = useState("");

  const { provinces } = useGetAllProvince();
  const { province } = useGetProvince(selectedProvince || "");
  const { city } = useGetCity(selectedCity || "");

  const provinceOptions = useMapInputOptions(provinces);
  const cityOptions = useMapInputOptions(province?.cities);
  const subDistrictOptions = useMapInputOptions(city?.sub_districts);

  useEffect(() => {
    setSelectedCity("");
    setSelectedSubDistrict("");
  }, [selectedProvince]);

  return (
    <>
      <Select
        label="Provinsi"
        name="province_id"
        isRequired={true}
        selectOptions={provinceOptions}
        defaultValue={selectedProvince}
        onChange={(e) => setSelectedProvince(e.target.value)}
      />

      <Select
        label="Kabupaten/Kota"
        name="city_id"
        isRequired={true}
        selectOptions={cityOptions}
        defaultValue={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        isDisabled={!selectedProvince}
      />

      <Select
        label="Kecamatan"
        name="sub_district_id"
        isRequired={true}
        selectOptions={subDistrictOptions}
        defaultValue={selectSubDistrict}
        onChange={(e) => setSelectedSubDistrict(e.target.value)}
        isDisabled={!selectedCity}
      />
    </>
  );
};

export default FilterPatientRegional;
