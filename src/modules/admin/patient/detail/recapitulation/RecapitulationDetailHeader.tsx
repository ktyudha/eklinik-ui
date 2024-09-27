import { FunctionComponent } from 'react'
import { UilFileDownload , UilPrint } from '@iconscout/react-unicons'
import { useLocation, useParams } from 'react-router-dom'
import useExportDetailRecapStudyDomesticUnversity from '@services/global/report/recapitulation/hooks/useExportDetailRecapStudyDomesticUnversity'
import useExportDetailRecapStudyDomesticDepartment from '@services/global/report/recapitulation/hooks/useExportDetailRecapStudyDomesticDepartment'
import useExportDetailRecapStudyOverseasUnversity from '@services/global/report/recapitulation/hooks/useExportDetailRecapStudyOverseasUnversity'

const RecapitulationDetailHeader: FunctionComponent = () => {
  const { recapitulationId } = useParams()
  const { state } = useLocation()

  const onDownload = async (fileType: string) => {
    if (state.location === 'domestic' && state.type === 'university') {
      await useExportDetailRecapStudyDomesticUnversity(fileType, recapitulationId as string) 
    } else if (state.location === 'domestic' && state.type === 'department') {
      await useExportDetailRecapStudyDomesticDepartment(fileType, recapitulationId as string)
    } else {
      await useExportDetailRecapStudyOverseasUnversity(fileType, state.university_name)
    }
  }

  return (
    <div className="flex flex-wrap justify-between gap-4">
      <div className='flex flex-wrap items-center justify-between gap-2 md:gap-0'>
        <h1 className="text-3xl font-bold leading-9 text-black">Detail Rekapitulasi</h1>
      </div>

      <div className='flex items-center gap-3'>
        <button
          type='button'
          className="flex items-center gap-1 hover:bg-transparent bg-[#35BB5D] px-3 py-1.5 border border-[#35BB5D] rounded-lg text-sm hover:text-[#35BB5D] text-white transition-all duration-200 ease-in-out"
          onClick={() => onDownload('excel')}
        >
          <UilFileDownload size={20} />
          <span className='font-medium'>Excel</span>
        </button>
        <button
          type='button'
          className="flex items-center gap-1 hover:bg-transparent bg-[#3B82F6] px-3 py-1.5 border border-[#3B82F6] rounded-lg text-sm hover:text-[#3B82F6] text-white transition-all duration-200 ease-in-out"
          onClick={() => onDownload('pdf')}
        >
          <UilPrint size={20} />
          <span className='font-medium'>Cetak</span>
        </button>
      </div>
    </div>
  )
}

export default RecapitulationDetailHeader