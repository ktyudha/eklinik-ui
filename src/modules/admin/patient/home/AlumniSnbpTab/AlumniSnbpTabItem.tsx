import { FunctionComponent } from "react"
import useSchoolStore from "@modules/school/_store/useSchoolStore"

interface Props {
  label: string
  value: string
}

const AlumniSnbpTabItem: FunctionComponent<Props> = ({ label, value }) => {
  const { activeAlumniSnbpTab, setActiveAlumniSnbpTab } = useSchoolStore(
    (state) => ({
      activeAlumniSnbpTab: state.activeAlumniSnbpTab,
      setActiveAlumniSnbpTab: state.setActiveAlumniSnbpTab,
    })
  )

  const isActive = activeAlumniSnbpTab === value

  return (
    <li className="w-full">
      <div
        className={`inline-block w-full px-4 py-1 active focus:outline-none text-lg rounded-full cursor-pointer ${
          isActive
            ? "bg-[#006C1C] text-white border-2 border-white"
            : "bg-[#006C1C] text-white text-gray-900"
        }`}
        aria-current="page"
        onClick={() => setActiveAlumniSnbpTab(value)}
      >
        {label}
      </div>
    </li>
  )
}

export default AlumniSnbpTabItem
