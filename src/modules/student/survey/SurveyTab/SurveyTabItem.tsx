import { FunctionComponent } from 'react'

interface Props {
  label: string
  isActive: boolean
}

const SurveyTabItem: FunctionComponent<Props> = ({
  label,
  isActive
}) => {
  const borders = isActive
    ? 'md:rounded-l-md md:rounded-r-none'
    : 'md:rounded-r-md md:rounded-l-none'

  return (
    <li className="w-full">
      <div
        className={`inline-block w-full px-4 py-3 active focus:outline-none ${isActive ? 'bg-green-500 text-white' : 'bg-transparent'} ${borders} rounded-md`}
        aria-current="page"
      >
        <span className='text-lg'>{label}</span>
      </div>
    </li>
  )
}

export default SurveyTabItem