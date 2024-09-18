import { FunctionComponent } from 'react'
import useStudentStore from '@modules/student/_store/useStudentStore'
import * as RCSelect from 'react-select'
import Input from '@components/reusable/Form/Input'
import ReactSelect from 'react-select'
import useMapInputOptions from '@hooks/useMapInputOptions'
import useGetAllCity from '@services/global/region/city/hooks/useGetAllCity'
import useGetAllProvince from '@services/global/region/province/hooks/useGetAllProvince'
import '../../../../../styles/react-select.css'
import { MARITAL_STATUS } from '@constant/utils'
import { OptionValue } from '@modules/student/_store/slices/profile.slice'

const selectStyles: RCSelect.StylesConfig = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    paddingLeft: '6px',
    paddingRight: '6px',
    paddingTop: '1px',
    paddingBottom: '1px',
    boxShadow: 'none',
    ":hover": {
      border: '2px solid #e5e7eb'
    }
  }),
  option: (styles) => ({
    ...styles,
  }),
  input: (styles) => ({
    ...styles,
    fontSize: '15px',
    fontWeight: 400,
    lineHeight: '20px',
    color: 'neutral.800',
  }),
  placeholder: (styles) => ({
    ...styles,
    fontSize: '15px',
    fontWeight: 400,
    lineHeight: '20px',
    color: '#6b7280',
  }),
  menu: provided => ({
    ...provided,
    zIndex: '-10px'
  }),
  menuPortal: provided => ({
    ...provided,
    zIndex: '-10px'
  }),
}

const SurveyContentStepFirstUpdate: FunctionComponent = () => {
  const {
    selectedMaritalStatus,
    selectedProvince,
    selectedCity,
    selectedSubDistrict,
    setSelectedMaritalStatus,
    setSelectedProvince,
    setSelectedCity,
    setSelectedSubDistrict,
  } = useStudentStore((state) => ({
    selectedMaritalStatus: state.selectedMaritalStatus,
    selectedProvince: state.selectedProvince,
    selectedCity: state.selectedCity,
    selectedSubDistrict: state.selectedSubDistrict,
    setSelectedMaritalStatus: state.setSelectedMaritalStatus,
    setSelectedProvince: state.setSelectedProvince,
    setSelectedCity: state.setSelectedCity,
    setSelectedSubDistrict: state.setSelectedSubDistrict,
  }))

  const { provinces } = useGetAllProvince()
  const { cities } = useGetAllCity()
  const provinceOptions = useMapInputOptions(provinces)
  const cityOptions = provinces?.find((province) => province.id === selectedProvince?.value as string)?.cities
  const subDistrictOptions = cities?.find((city) => city.id === selectedCity?.value as string)?.sub_districts

  const onChangeProvince = (param: OptionValue | null) => {
    if (param !== null) {
      setSelectedProvince(param)
    } else {
      setSelectedProvince(null)
    }

    onChangeCity(null)
  }

  const onChangeCity = (param: OptionValue | null) => {
    if (param !== null) {
      setSelectedCity(param)
    } else {
      setSelectedCity(null)
    }

    onChangeSubDistrict(null)
  }

  const onChangeSubDistrict = (param: OptionValue | null) => {
    if (param !== null) {
      setSelectedSubDistrict(param)
    } else {
      setSelectedSubDistrict(null)
    }
  }
  
  return (
    <div className='border border-green-500 rounded-md'>
      {/* Content Header */}
      <div className='bg-green-500 rounded-t-md p-3'>
        <span className='text-white font-semibold'>UPDATE DATA PRIBADI</span>
      </div>

      {/* Content Body */}
      <div className='py-4 px-5'>
        <div className='grid grid-cols-6 gap-4'>
          <div className='col-span-6 md:col-span-3'>
            <Input
              label='Tahun Lulus'
              name='graduationYear'
              type='number'
              min={0}
              placeholder='Tahun Lulus'
              isRequired
            />
          </div>
          <div className='col-span-6 md:col-span-3'>
            <div className='flex flex-col'>
              <label className="flex gap-1 leading-4 mb-2 font-normal">
                Status Perkawinan <div className='text-red-500'>*</div>
              </label>
              <select
                className='h-[38px] border-2 py-2 px-3 h-[44px] rounded-lg outline-none w-full'
                name='maritalStatus'
                onChange={(e) => setSelectedMaritalStatus(e.target.value)}
                required
              >
                <option value='' selected>Pilih Status Perkawinan</option>
                {MARITAL_STATUS?.map((status, idx) => (
                  <option
                    key={`option-item-${idx}`}
                    value={status.value}
                    selected={selectedMaritalStatus === status.value}
                  >
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='col-span-6 md:col-span-3'>
            <Input
              label='Email'
              name='email'
              type='email'
              placeholder='Email'
              isRequired
            />
          </div>
          <div className='col-span-6 md:col-span-3'>
            <Input
              label='No.HP / Whatsapp'
              name='phoneNumber'
              type='number'
              min={0}
              placeholder='089xxxxxxxxx'
            />
          </div>
          <div className='col-span-6 md:col-span-2'>
            <div className='flex flex-col z-[-10px]'>
              <label className="flex gap-1 leading-4 text-[#1E293B] mb-2 font-normal">
                Provinsi <div className='text-red-500'>*</div>
              </label>
              <ReactSelect
                name='provinceId'
                className='basic-single'
                classNamePrefix='select'
                placeholder='Pilih Provinsi'
                menuPosition='fixed'
                options={provinceOptions}
                styles={selectStyles}
                isSearchable
                isClearable
                value={selectedProvince}
                onChange={(e: any) => onChangeProvince(e)}
                required
              />
            </div>
          </div>
          <div className='col-span-6 md:col-span-2'>
            <div className='flex flex-col'>
              <label className="flex gap-1 leading-4 text-[#1E293B] mb-2 font-normal">
                Kota / Kabupaten <div className='text-red-500'>*</div>
              </label>
              <ReactSelect
                name='cityId'
                className='basic-single'
                classNamePrefix='select'
                placeholder='Pilih Kota / Kabupaten'
                options={cityOptions?.map(city => {
                  return {
                    label: city.name,
                    value: city.id
                  }
                })}
                styles={selectStyles}
                isSearchable
                isClearable
                value={selectedCity}
                onChange={(e: any) => onChangeCity(e)}
                required
              />
            </div>
          </div>
          <div className='col-span-6 md:col-span-2'>
            <div className='flex flex-col'>
              <label className="flex gap-1 leading-4 text-[#1E293B] mb-2 font-normal">
                Kecamatan <div className='text-red-500'>*</div>
              </label>
              <ReactSelect
                name='subDistrictId'
                className='basic-single'
                classNamePrefix='select'
                placeholder='Pilih Kecamatan'
                options={subDistrictOptions?.map(subDistrict => {
                  return {
                    label: subDistrict.name,
                    value: subDistrict.id
                  }
                })}
                styles={selectStyles}
                isSearchable
                isClearable
                value={selectedSubDistrict}
                onChange={(e: any) => onChangeSubDistrict(e)}
                required
              />
            </div>
          </div>
          <div className='col-span-6 md:col-span-3'>
            <Input
              label='Tempat Tinggal Sekarang (Kelurahan / Desa)'
              name='village'
              type='text'
              placeholder='Tempat Tinggal Sekarang (Kelurahan / Desa)'
              isRequired
            />
          </div>
          <div className='col-span-6 md:col-span-3'>
            <Input
              label='Tempat Tinggal Sekarang (Alamat)'
              name='address'
              type='text'
              placeholder='Tempat Tinggal Sekarang (Alamat)'
              isRequired
            />
          </div>
          <div className='col-span-6 md:col-span-3'>
            <Input
              label='RT (Rukun Tetangga)'
              name='rt'
              type='number'
              min={0}
              placeholder='RT (Rukun Tetangga)'
              isRequired
            />
          </div>
          <div className='col-span-6 md:col-span-3'>
            <Input
              label='RW (Rukun Warga)'
              name='rw'
              type='number'
              min={0}
              placeholder='RW (Rukun Warga)'
              isRequired
            />
          </div>
        </div> 
      </div>
    </div>
  )
}

export default SurveyContentStepFirstUpdate