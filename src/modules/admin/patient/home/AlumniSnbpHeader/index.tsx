import { FunctionComponent } from "react"

const AlumniSnbpHeader: FunctionComponent = () => {
  return (
    <div className="flex flex-col gap-4 mb-4">
      <div className="flex flex-wrap items-center justify-between gap-2 md:gap-0">
        <h1 className="text-3xl font-bold leading-9 text-black">
          Indeks Alumni [SNBP]
        </h1>
      </div>
    </div>
  )
}

export default AlumniSnbpHeader
