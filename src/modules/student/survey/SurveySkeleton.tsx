import { FunctionComponent } from 'react'
import Skeleton from 'react-loading-skeleton'

const SurveySkeleton: FunctionComponent = () => {
  return (
    <div className='max-w-full flex flex-col gap-5'>
      {/* tabs */}
      <div className='w-full'>
        <Skeleton width='100%' height={50} borderRadius={6} />
      </div>

      {/* group */}
      <div className='w-full border-2 rounded-md pt-0'>
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

        <div className='grid grid-cols-2 gap-5 p-3'>
          <div className='col-span-2 md:col-span-1'>
            <div className='flex flex-col gap-1'>
              <Skeleton width='40%' height={20} borderRadius={6} />
              <Skeleton width='100%' height={35} borderRadius={6} />
            </div>
          </div>
          <div className='col-span-2 md:col-span-1'>
            <div className='flex flex-col gap-1'>
              <Skeleton width='40%' height={20} borderRadius={6} />
              <Skeleton width='100%' height={35} borderRadius={6} />
            </div>
          </div>
          <div className='col-span-2 md:col-span-1'>
            <div className='flex flex-col gap-1'>
              <Skeleton width='40%' height={20} borderRadius={6} />
              <Skeleton width='100%' height={35} borderRadius={6} />
            </div>
          </div>
          <div className='col-span-2 md:col-span-1'>
            <div className='flex flex-col gap-1'>
              <Skeleton width='40%' height={20} borderRadius={6} />
              <Skeleton width='100%' height={35} borderRadius={6} />
            </div>
          </div>
          <div className='col-span-2 md:col-span-1'>
            <div className='flex flex-col gap-1'>
              <Skeleton width='40%' height={20} borderRadius={6} />
              <Skeleton width='100%' height={35} borderRadius={6} />
            </div>
          </div>
          <div className='col-span-2 md:col-span-1'>
            <div className='flex flex-col gap-1'>
              <Skeleton width='40%' height={20} borderRadius={6} />
              <Skeleton width='100%' height={35} borderRadius={6} />
            </div>
          </div>
          <div className='col-span-2 md:col-span-1'>
            <div className='flex flex-col gap-1'>
              <Skeleton width='40%' height={20} borderRadius={6} />
              <Skeleton width='100%' height={35} borderRadius={6} />
            </div>
          </div>
          <div className='col-span-2 md:col-span-1'>
            <div className='flex flex-col gap-1'>
              <Skeleton width='40%' height={20} borderRadius={6} />
              <Skeleton width='100%' height={35} borderRadius={6} />
            </div>
          </div>
          <div className='col-span-2 md:col-span-1'>
            <div className='flex flex-col gap-1'>
              <Skeleton width='40%' height={20} borderRadius={6} />
              <Skeleton width='100%' height={35} borderRadius={6} />
            </div>
          </div>
          <div className='col-span-2 md:col-span-1'>
            <div className='flex flex-col gap-1'>
              <Skeleton width='40%' height={20} borderRadius={6} />
              <Skeleton width='100%' height={35} borderRadius={6} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SurveySkeleton