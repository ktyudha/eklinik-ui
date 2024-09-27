import { FunctionComponent } from "react";
import ReactSelect from "react-select";
import useSchoolStore from "@modules/school/_store/useSchoolStore";
import useGetFilterDomesticDepartment from "@services/school/alumni-snbp/hooks/useGetFilterDomesticDepartment";
import useMapInputOptions from "@hooks/useMapInputOptions";
import { OptionValue } from "@modules/student/_store/slices/profile.slice";

const DomesticDepartmentSelect: FunctionComponent = () => {
  const { filterDepartment, setFilterDepartment } = useSchoolStore((state) => ({
    filterDepartment: state.filterDepartment,
    setFilterDepartment: state.setFilterDepartment,
  }));

  const { filters } = useGetFilterDomesticDepartment();
  const departmentOptions = useMapInputOptions(filters)

  const onChangeFilter = (value: OptionValue) => {
    setFilterDepartment(value);
  };

  return (
    <ReactSelect
      name="search"
      className="basic-single"
      classNamePrefix="select"
      placeholder="Cari Program Studi..."
      options={[{
        label: 'Pilih Program Studi',
        value: '',
      }, ...departmentOptions]}
      isSearchable
      isClearable
      value={filterDepartment}
      onChange={(e: any) => onChangeFilter(e)}
      required
    />
  );
};
export default DomesticDepartmentSelect;
