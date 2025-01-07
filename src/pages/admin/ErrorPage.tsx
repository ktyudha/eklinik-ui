import { FunctionComponent } from "react"
import { useNavigate } from "react-router-dom"

const ErrorPage: FunctionComponent = () => {
  const navigate = useNavigate()

  return (
    <div className="w-100 md:h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl text-gray-500 font-semibold mb-4">Halaman Tidak Tersedia</h1>
      <button
        onClick={() => navigate('/login')}
        className="bg-[#3B82F6] hover:bg-blue-600 py-2 px-5 rounded-md text-white font-semibold"
      >
        Kembali
      </button>
    </div>
  )
}

export default ErrorPage
