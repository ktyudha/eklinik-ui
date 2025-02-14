import { FunctionComponent, useEffect, useState } from "react";
import ReactSelect from "react-select";
import { useFormContext } from "react-hook-form";

export interface OptionValue {
  label: string;
  value: string | number;
}
interface Props {
  label?: string;
  name: string;
  isMulti?: boolean;
  isRequired?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  value?: any;
  defaultValue?: any;
  textTransform?: string;
  selectTwoOptions: {
    label: string;
    value: string | number;
  }[];
}

const SelectTwo: FunctionComponent<Props> = ({
  label,
  name,
  isMulti,
  isRequired,
  isSearchable = false,
  isClearable,
  value,
  defaultValue,
  selectTwoOptions,
  textTransform,
  ...restProps
}) => {
  const { register, unregister, setValue } = useFormContext();
  const [selectedValue, setSelectedValue] = useState<null | OptionValue>(null);

  useEffect(() => {
    if (value) {
      setSelectedValue(value);
      setValue(name, value); // Sinkronkan nilai awal dengan react-hook-form
    }
  }, [value, name, setValue]);

  useEffect(() => {
    if (!selectedValue && defaultValue) {
      setSelectedValue(defaultValue);
      setValue(name, defaultValue.value); // Pastikan juga react-hook-form mendapatkan nilai awal
    }
  }, [defaultValue, selectedValue, setValue, name]);

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
        className={`${isMulti ? "basic-multi-select" : "basic-single"}`}
        classNamePrefix={`select-${label}`}
        placeholder={`Pilih ${label}`}
        {...(name &&
          register(name, {
            required: isRequired && {
              value: false,
              message: "Tidak Boleh Kosong",
            },
          }))}
        key={name}
        options={[
          {
            label: `Pilih ${label}`,
            value: "",
          },
          ...selectTwoOptions,
        ]}
        isSearchable={isSearchable}
        isClearable={isClearable}
        isMulti={isMulti}
        defaultValue={selectedValue ?? defaultValue}
        required={isRequired}
        classNames={{
          option: () => textTransform ?? "capitalize",
          singleValue: () => textTransform ?? "capitalize",
        }}
        styles={{
          control: (base) => ({
            ...base,
            minHeight: "8px", // Tambah tinggi input
            padding: "4px", // Tambah padding atas-bawah
          }),
          valueContainer: (base) => ({
            ...base,
            padding: "4px", // Tambah ruang dalam elemen
          }),
          input: (base) => ({
            ...base,
            fontSize: "6px", // Ubah ukuran font jika perlu
          }),
        }}
        onChange={(e: any) => {
          // Ambil hanya nilai value jika multi-select, jika single-select, ambil langsung value
          const selectedValues = isMulti
            ? e.map((item: any) => item.value)
            : e
            ? e.value
            : null;
          setSelectedValue(selectedValues);
          setValue(name, selectedValues);
        }}
      />
    </div>
  );
};
export default SelectTwo;
