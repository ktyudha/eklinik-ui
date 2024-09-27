import { FunctionComponent } from 'react'
import Skeleton from 'react-loading-skeleton'

const DepartementTableSkeleton: FunctionComponent = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr key={`table-skeleton-${i}`} className='h-16 border-b'>
          <td className='text-center'>
            <Skeleton width={30} height={20} />
          </td>
          <td>
            <Skeleton width={500} height={20} />
          </td>
          <td className='text-center'>
            <Skeleton width={50} height={20} />
          </td>
          <td className='text-center'>
            <Skeleton width={50} height={20} />
          </td>
        </tr>
      ))}
    </>
  )
}

export default DepartementTableSkeleton