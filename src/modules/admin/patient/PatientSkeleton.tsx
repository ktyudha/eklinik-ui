import { FunctionComponent } from 'react'
import Skeleton from 'react-loading-skeleton'

const DashboardSkeleton: FunctionComponent = () => {
  return (
    <div className='max-w-full flex flex-col gap-5'>
      <Skeleton width='20%' height={30} borderRadius={6} />
      <div className='grid grid-cols-5 gap-5'>
        <Skeleton width='100%' height={130} borderRadius={6} />
        <Skeleton width='100%' height={130} borderRadius={6} />
        <Skeleton width='100%' height={130} borderRadius={6} />
        <Skeleton width='100%' height={130} borderRadius={6} />
        <Skeleton width='100%' height={130} borderRadius={6} />
      </div>

      {/* group */}
      <div className='w-full border-2 rounded-md pt-0 pb-5'>
        <Skeleton
          width='100%'
          height={50}
          style={{
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            top: '-5px'
          }}
        />

        <div className='flex flex-col gap-3 pt-3'>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className='grid grid-cols-4 gap-5 px-3'>
              <div className='col-span-4 md:col-span-1'>
                <Skeleton width='100%' height={35} borderRadius={6} />
              </div>
              <div className='col-span-4 md:col-span-1'>
                <Skeleton width='100%' height={35} borderRadius={6} />
              </div>
              <div className='col-span-4 md:col-span-2'>
                <Skeleton width='100%' height={35} borderRadius='20px' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DashboardSkeleton