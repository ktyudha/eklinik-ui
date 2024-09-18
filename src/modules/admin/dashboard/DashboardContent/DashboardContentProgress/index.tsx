import { FunctionComponent } from 'react'
import { UilSignalAlt3 } from '@iconscout/react-unicons'
import { Progress } from '@services/admin/information/interfaces/get-information.types'
import DashboardContentProgressItem from './DashboardContentProgressItem'

type Props = {
  level: string,
  progress: Progress
}

const DashboardContentProgress: FunctionComponent<Props> = ({ level, progress }) => {
  const finished = progress.statuses.find(status => status.status === 'finished')
  const notDoneYet = progress.statuses.find(status => status.status === 'not_done_yet')
  const workingOn = progress.statuses.find(status => status.status === 'working_on')
  const inProgress = progress.statuses.find(status => status.status === 'progress')

  return (
    <div className="">
      <div className="w-full rounded-lg flex flex-col justify-start items-start p-5 border border-[#E2E8F0]">
        <div className="w-full border-b border-[#E2E8F0] pb-3 flex items-center">
          <div className='pe-2 pb-2 border-r-2 border-b-2 relative'>
            <div className='bg-[#92C7B7] rounded-full w-[35px] h-[35px] text-white flex items-center justify-center absolute top-[-3px] left-[3px]'>
              <UilSignalAlt3 size='20' />
            </div>
            <div className='bg-[#5DB0AC] px-3 py-1 pb-2'>
              <h3 className="text-base font-medium leading-4 text-white ps-8">Progress Status</h3>
            </div>
          </div>
  
          <div className='pe-2 pb-2 border-r-2 border-b-2 relative'>
            <div className='bg-[#4d4d4d] px-3 py-1 pb-2'>
              <h3 className="text-base font-medium leading-4 text-white">{level}</h3>
            </div>
          </div>
        </div>
  
        <div className="w-full mt-3">
          <div className='flex flex-col gap-3'>
            <DashboardContentProgressItem
              status='SELESAI'
              total={finished?.total as number}
              from={finished?.from as number}
              percentage={finished?.percentage as string}
              bgColor='#16a34a'
            />
            <DashboardContentProgressItem
              status='Sedang Mengerjakan'
              total={workingOn?.total as number}
              from={workingOn?.from as number}
              percentage={workingOn?.percentage as string}
              bgColor='#2563eb'
            />
            <DashboardContentProgressItem
              status='Progress'
              total={inProgress?.total as number}
              from={inProgress?.from as number}
              percentage={inProgress?.percentage as string}
              bgColor='#eab308'
            />
            <DashboardContentProgressItem
              status='Belum Mengerjakan'
              total={notDoneYet?.total as number}
              from={notDoneYet?.from as number}
              percentage={notDoneYet?.percentage as string}
              bgColor='#dc2626'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardContentProgress
