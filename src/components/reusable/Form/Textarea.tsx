import { FunctionComponent, useEffect } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  label?: string;
  name: string;
  placeholder: string;
  error?: string;
  isRequired?: boolean;
  rows?: number;
  defaultValue?: any;
}

const Textarea: FunctionComponent<Props> = ({
  label,
  name,
  placeholder,
  error,
  isRequired,
  rows,
  defaultValue,
  ...restProps
}) => {
  const { register, unregister } = useFormContext();

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
      <textarea
        {...restProps}
        className="border-2 py-2 px-3 rounded-lg"
        name={name}
        placeholder={placeholder}
        rows={rows || 3}
        {...(name &&
          register(name, {
            required: isRequired && {
              value: true,
              message: "Tidak Boleh Kosong",
            },
          }))}
        key={name}
        defaultValue={defaultValue}
        required={isRequired}
      />
    </div>
  );
};

export default Textarea;
