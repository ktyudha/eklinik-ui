import { FunctionComponent } from "react";
import ReactSelect from "react-select";
import useSchoolStore from "@modules/school/_store/useSchoolStore";
import useGetFilterDomesticUniversity from "@services/school/alumni-snbp/hooks/useGetFilterDomesticUniversity";
import useMapInputOptions from "@hooks/useMapInputOptions";
import { OptionValue } from "@modules/student/_store/slices/profile.slice";

const DomesticUniversitySelect: FunctionComponent = () => {
  const { filterUniversity, setFilterUniversity } = useSchoolStore((state) => ({
    filterUniversity: state.filterUniversity,
    setFilterUniversity: state.setFilterUniversity,
  }));

  const { filters } = useGetFilterDomesticUniversity();
  const universityOptions = useMapInputOptions(filters)
  
  const onChangeFilter = (value: OptionValue) => {
    setFilterUniversity(value);
  };

  return (
    <ReactSelect
      name="search"
      className="basic-single"
      classNamePrefix="select"
      placeholder="Cari Perguruan Tinggi..."
      options={[{
        label: 'Pilih Perguruan Tinggi',
        value: '',
      }, ...universityOptions]}
      isSearchable
      isClearable
      value={filterUniversity}
      onChange={(e: any) => onChangeFilter(e)}
      required
    />
  );
};
export default DomesticUniversitySelect;
