import { FunctionComponent, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

interface Props {
  label?: string
  name: string
  error?: string
  isRequired?: boolean
  isDisabled?: boolean
  defaultValue?: any
  value?: any
  selectOptions: {
    label: string
    value: string | number
  }[],
  textTransform?: string
  fontSizeLabel?: string
  fontWeightLabel?: string
}

const Select: FunctionComponent<Props> = ({
  label,
  name,
  error,
  isRequired,
  isDisabled,
  defaultValue,
  value,
  selectOptions,
  textTransform,
  fontSizeLabel = 'text-md',
  fontWeightLabel = 'font-normal',
  ...restProps
}) => {
  const { register, unregister } = useFormContext()

  useEffect(
    () => () => {
      unregister(name)
    },
    [name, unregister],
  )

  return (
    <div className='flex flex-col'>
      {label && (
        <label htmlFor={name} className="flex gap-1 font-normal text-md leading-4 text-[#1E293B] mb-2">
          {label} {isRequired && <div className='text-red-500'>*</div>}
        </label>
      )}
      <select
        {...restProps}
        className={`flex gap-1 border-2 py-2 px-3 rounded-lg outline-none ${fontSizeLabel} ${fontWeightLabel} ${isDisabled && 'bg-gray-100'}`}
        name={name}
        {...(name &&
          register(name, {
            required: isRequired && {
              value: true,
              message: 'Tidak Boleh Kosong',
            },
          }))
        }
        key={name}
        value={value ?? undefined}
        defaultValue={defaultValue ?? undefined}
        required={isRequired}
        disabled={isDisabled}
      >
        <option value='' selected>Pilih {label}</option>
        {selectOptions?.map((option) => (
          <option
            key={`select-item-${option.value}`}
            value={option.value}
            selected={option.value === defaultValue}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select