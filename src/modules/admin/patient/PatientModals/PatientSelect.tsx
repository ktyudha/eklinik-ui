import { FunctionComponent } from "react";
import ReactSelect from "react-select";
// import useSubAgencyStore from "@/modules/sub-agency/_store/useSubAgencyStore";
import useMapInputOptions from "@/hooks/useMapInputOptions";
// import { OptionValue } from "@types/react-helmetmodules/student/_store/slices/profile.slice";
// import useGetFilterAlumniTrackingUniversity from "@/services/global/alumni-snbp/hooks/useGetFilterAlumniTrackingUniversity";
// import useGlobalStore from "@/store/useStore";
import useGetAllProvince from "@/services/global/region/province/hooks/useGetAllProvince";

const UniversitySelect: FunctionComponent = () => {
  const { provinces } = useGetAllProvince();
  const universityOptions = useMapInputOptions(provinces);

  return (
    <ReactSelect
      name="search"
      className="basic-single"
      classNamePrefix="select"
      placeholder="Cari Perguruan Tinggi..."
      options={[
        {
          label: "Pilih Perguruan Tinggi",
          value: "",
        },
        ...universityOptions,
      ]}
      isSearchable
      isClearable
      //   value={filterUniversity}
      //   onChange={(e: any) => onChangeFilter(e)}
      required
    />
  );
};
export default UniversitySelect;
