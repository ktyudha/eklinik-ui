import { FunctionComponent } from "react"
import useSchoolStore from "@modules/school/_store/useSchoolStore"
import AlumniSnbpHeader from "./AlumniSnbpHeader"
import AlumniSnbpTab from "./AlumniSnbpTab"
import AlumniSnbpContentRecapitulation from "./AlumniSnbpContent/AlumniSnbpContentRecapitulation"
import AlumniSnbpContentAlumni from "./AlumniSnbpContent/AlumniSnbpContentTracking"

const AlumniSnbpHome: FunctionComponent = () => {
  const { activeAlumniSnbpTab } = useSchoolStore((state) => ({
    activeAlumniSnbpTab: state.activeAlumniSnbpTab,
  }))

  return (
    <div className="max-w-full px-3">
      <AlumniSnbpHeader />

      <div className="mt-4 flex flex-col gap-5">
        <AlumniSnbpTab />
        {activeAlumniSnbpTab === "alumni-snbp-recapitulation" ? (
          <AlumniSnbpContentRecapitulation />
        ) : (
          <AlumniSnbpContentAlumni />
        )}
      </div>
    </div>
  )
}

export default AlumniSnbpHome
