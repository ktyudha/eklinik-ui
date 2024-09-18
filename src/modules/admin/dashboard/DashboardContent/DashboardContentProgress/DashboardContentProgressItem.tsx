import { FunctionComponent } from 'react'
import ProgressBar from "@ramonak/react-progress-bar"

interface Props {
  status: string
  total: number
  from: number
  percentage: string
  bgColor: string
}

const DashboardContentProgressItem: FunctionComponent<Props> = ({
  status,
  total,
  from,
  percentage,
  bgColor
}) => {
  const percent = Number(percentage.replace('%', ''))

  const numberFormat = (value: number) => value.toLocaleString('id-ID', {
    maximumFractionDigits: 0,
  })

  return (
    <div className="grid grid-cols-6 items-center gap-5">
      <div className="col-span-6 md:col-span-4 lg:col-span-1">
        <div className='border-b-2 border-gray-900 py-1 w-48'>
          <span className='text-gray-900 font-semibold uppercase'>{status}</span>
        </div>
      </div>
      <div className="col-span-6 md:col-span-6 lg:col-span-2">
        <div className='bg-gray-300 px-3 py-1 w-full'>
          <span className='text-semibold'>{numberFormat(total)} / {numberFormat(from)} Siswa</span>
        </div>
      </div>
      <div className="col-span-6 md:col-span-6 lg:col-span-3">
        <ProgressBar
          completed={percent}
          bgColor={bgColor}
          height='30px'
          labelColor='white'
          labelAlignment='center'
          isLabelVisible={percent < 6 ? false : true}
        />
      </div>
    </div>
  )
}

export default DashboardContentProgressItem
