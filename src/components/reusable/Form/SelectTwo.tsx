import { FunctionComponent, useState, useEffect } from "react";
import ReactSelect from "react-select";
import useMapInputOptions from "@/hooks/useMapInputOptions";
import { useFormContext } from "react-hook-form";

interface Props {
  label?: string;
  name: string;
  isRequired?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  value?: any;
  selectOptions: any;
  onChange?: (value: OptionValue | null) => void;
}

export interface OptionValue {
  label: string;
  value: string;
}

const SelectTwo: FunctionComponent<Props> = ({
  label,
  name,
  isRequired,
  isSearchable = false,
  isClearable,
  value,
  selectOptions,
  onChange,
  ...restProps
}) => {
  const { register, unregister } = useFormContext();
  const selectTwoOptions = useMapInputOptions(selectOptions);
  const [valueSelected, setValueSelected] = useState<OptionValue | null>(
    value || null
  );

  // const onChangeSelectTwo = (selectedValue: OptionValue | null) => {
  //   setValueSelected(value); // Perbarui nilai lokal
  //   if (onChange) {
  //     onChange(selectedValue); // Panggil onChange eksternal jika tersedia
  //   } else {
  //     setValue(name, selectedValue?.value || ""); // Sinkronisasi ke react-hook-form
  //   }
  // };

  useEffect(
    () => () => {
      unregister(name);
    },
    [name, unregister]
  );

  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={name}
          className="flex gap-1 font-normal text-md leading-4 text-[#1E293B] mb-2"
        >
          {label} {isRequired && <div className="text-red-500">*</div>}
        </label>
      )}

      <ReactSelect
        {...restProps}
        name={name}
        className="basic-single"
        classNamePrefix={`select-${label}`}
        placeholder={`Pilih ${label}`}
        options={[
          {
            label: `Pilih ${label}`,
            value: "",
          },
          ...selectTwoOptions,
        ]}
        {...(name &&
          register(name, {
            required: isRequired && {
              value: true,
              message: "Tidak Boleh Kosong",
            },
          }))}
        key={name}
        isSearchable={isSearchable}
        isClearable={isClearable}
        value={valueSelected}
        onChange={(e) => setValueSelected(e)}
        required={isRequired}
      />
    </div>
  );
};
export default SelectTwo;
