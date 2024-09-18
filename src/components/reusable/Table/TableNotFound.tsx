import { FunctionComponent } from 'react'
import EmptyIcon from '@assets/icons/empty.png'

interface Props {
  message?: string
}

const TableNotFound: FunctionComponent<Props> = ({
  message = 'Data Masih Kosong',
}) => {
  return (
    <tr className="relative md:h-60">
      <td className="absolute w-full h-full">
        <div className="flex flex-col items-center justify-center gap-3 h-full">
          <img src={EmptyIcon} alt="Icon" width='150' />
          <h1 className="font-semibold text-lg">{message}</h1>
        </div>
      </td>
    </tr>
  )
}

export default TableNotFound