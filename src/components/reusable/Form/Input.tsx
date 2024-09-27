import {
  FunctionComponent,
  HTMLInputTypeAttribute,
  useEffect,
  useState,
} from "react";
import { useFormContext } from "react-hook-form";
import { UilEye, UilEyeSlash } from "@iconscout/react-unicons";

interface Props {
  label?: string;
  name: string;
  type: string;
  placeholder: string;
  error?: string;
  withShowPasswordButton?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  defaultValue?: any;
  value?: any;
  fontSizeLabel?: string;
  fontWeightLabel?: string;
  min?: number;
}

const Input: FunctionComponent<Props> = ({
  label,
  name,
  type = "text",
  placeholder,
  error,
  withShowPasswordButton,
  isRequired = false,
  isReadOnly = false,
  defaultValue,
  value,
  fontSizeLabel = "text-md",
  fontWeightLabel = "font-normal",
  min,
  ...restProps
}) => {
  const { register, unregister } = useFormContext();
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [inputType, setInputType] = useState<HTMLInputTypeAttribute>(type);

  useEffect(
    () => () => {
      unregister(name);
    },
    [name, unregister]
  );

  const onSwitchPasswordType = () => {
    if (inputType === "password") {
      setInputType("text");
      setIsPasswordShow((prev) => !prev);
      return;
    }

    setInputType("password");
    setIsPasswordShow((prev) => !prev);
  };

  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={name}
          // className="flex gap-1 font-normal text-md leading-4 text-[#1E293B] mb-2"
          className={`flex gap-1 leading-4  mb-2 ${fontSizeLabel} ${fontWeightLabel}`}
        >
          {label} {isRequired && <div className="text-red-500">*</div>}
        </label>
      )}
      <div
        className={`border-2 py-2 px-3 rounded-lg flex flex-wrap items-stretch w-full ${
          isReadOnly && "bg-base-200"
        }`}
      >
        <input
          {...restProps}
          className={`flex-shrink flex-grow flex-auto leading-normal w-px border-0 outline-none font-normal ${
            isReadOnly && "bg-base-200"
          }`}
          name={name}
          type={inputType}
          placeholder={placeholder}
          {...(name &&
            register(name, {
              required: isRequired && {
                value: true,
                message: "Tidak Boleh Kosong",
              },
            }))}
          key={name}
          min={min}
          defaultValue={defaultValue}
          value={value}
          required={isRequired}
          readOnly={isReadOnly}
        />
        {type === "password" && withShowPasswordButton && (
          <button
            type="button"
            onClick={onSwitchPasswordType}
            className="flex items-center justify-center ml-2 -mr-px"
          >
            <span className="flex items-center bg-base-200 rounded whitespace-no-wrap text-gray-600">
              {isPasswordShow ? (
                <UilEyeSlash size="20" />
              ) : (
                <UilEye size="20" />
              )}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
