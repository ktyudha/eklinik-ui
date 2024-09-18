import { FunctionComponent } from 'react'
import Input from '@components/reusable/Form/Input'
import useGlobalStore from '@store/useStore'

const SurveyContentStepFirstProfile: FunctionComponent = () => {
  const {
    student,
  } = useGlobalStore((state) => ({
    student: state.student,
  }))

  return (
    <div className='border border-green-500 rounded-md'>
      {/* Content Header */}
      <div className='bg-green-500 rounded-t-md p-3'>
        <span className='text-white font-semibold'>DAPODIK ALUMNI - DATA UMUM</span>
      </div>

      {/* Content Body */}
      <div className='py-4 px-5'>
        <div className='grid grid-cols-6 gap-4'>
          <div className='col-span-6 md:col-span-3'>
            <Input
              label='Nomor Induk Siswa Nasional (NISN)'
              name='nisn'
              type='number'
              placeholder='Nomor Induk Siswa Nasional (NISN)'
              defaultValue={student?.nisn ?? undefined}
              isReadOnly
            />
          </div>
          <div className='col-span-6 md:col-span-3'>
            <Input
              label='Nama Lulusan'
              name='name'
              type='text'
              placeholder='Nama Lulusan'
              defaultValue={student?.name ?? undefined}
              isReadOnly
            />
          </div>
          <div className='col-span-6 md:col-span-3'>
            <Input
              label='Jenis Kelamin'
              name='gender'
              type='text'
              placeholder='Jenis Kelamin'
              defaultValue={student?.gender ? (student?.gender === 'L' ? 'Laki - Laki' : 'Perempuan') : undefined}
              isReadOnly
            />
          </div>
          <div className='col-span-6 md:col-span-3'>
            <Input
              label='Tingkat Pendidikan'
              name='educationLevel'
              type='text'
              placeholder='Tingkat Pendidikan'
              defaultValue={student?.grade ? student.grade.name : undefined}
              isReadOnly
            />
          </div>
          {/* <div className='col-span-6 md:col-span-2'>
            <Input
              label='Bidang'
              name='educationField'
              type='text'
              placeholder='Bidang'
              defaultValue=''
              isReadOnly
            />
          </div>
          <div className='col-span-6 md:col-span-2'>
            <Input
              label='Program'
              name='educationProgram'
              type='text'
              placeholder='Program'
              defaultValue=''
              isReadOnly
            />
          </div>
          <div className='col-span-6 md:col-span-2'>
            <Input
              label='Kompetensi'
              name='educationCompetence'
              type='text'
              placeholder='Kompetensi'
              defaultValue={student?.nisn ?? undefined}
              isReadOnly
            />
          </div> */}

          {/* School Data */}
          <div className='col-span-6 md:col-span-2'>
            <Input
              label='NPSN Sekolah'
              name='schoolNpsn'
              type='number'
              placeholder='NPSN Sekolah'
              defaultValue={student?.school.npsn}
              isReadOnly
            />
          </div>
          <div className='col-span-6 md:col-span-4'>
            <Input
              label='Nama Sekolah'
              name='schoolName'
              type='text'
              placeholder='Nama Sekolah'
              defaultValue={student?.school.name}
              isReadOnly
            />
          </div>
          <div className='col-span-6 md:col-span-6'>
            <Input
              label='Alamat Sekolah'
              name='schoolAddress'
              type='text'
              placeholder='Alamat Sekolah'
              defaultValue={student?.school.address}
              isReadOnly
            />
          </div>
          <div className='col-span-6 md:col-span-3'>
            <Input
              label='Provinsi'
              name='schoolProvince'
              type='text'
              placeholder='Provinsi'
              defaultValue={student?.school.province.name}
              isReadOnly
            />
          </div>
          <div className='col-span-6 md:col-span-3'>
            <Input
              label='Kabupaten / Kota'
              name='schoolCity'
              type='text'
              placeholder='Kabupaten / Kota'
              defaultValue={student?.school.city.name}
              isReadOnly
            />
          </div>
        </div> 
      </div>
    </div>
  )
}

export default SurveyContentStepFirstProfile