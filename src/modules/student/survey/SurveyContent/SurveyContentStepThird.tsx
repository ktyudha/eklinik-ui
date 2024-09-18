import { FunctionComponent } from 'react'
import iconTracer from '@/assets/images/icon-tracer.png'
// import Cookies from 'js-cookie'
// import { toast } from 'react-toastify'
// import { useNavigate } from 'react-router-dom'
// import { useStudentLogout } from '@services/auth/student-login/hooks/useStudentLogout'

const SurveyContentStepThird: FunctionComponent = () => {
  // const navigate = useNavigate()

  // const onLogout = async () => {
	// 	const { data, error } = await useStudentLogout()
	// 	if (data || error) {
  //     if (data) {
  //       Cookies.remove('token-student')
  //     	navigate('/alumni/login', { replace: true })
  //     } else {
	// 			toast.error("Logout Gagal", {
	// 				position: toast.POSITION.TOP_CENTER,
	// 				data: {
	// 					text: error
	// 				}
	// 			})
  //     }
  //   }
	// }

  // useEffect(() => {
  //   setTimeout(async () => {
  //     await onLogout()
  //   }, 1000 * 60)
  // }, [])

  return (
    <div className='flex flex-col items-center justify-center text-center gap-3 h-[80vh]'>
      <img src={iconTracer} alt="avatar" className="mr-2 mb-2" loading="lazy" width='200' />
      <span className='text-2xl'>Terima kasih Anda sudah berpartisipasi dalam
        <span className='font-bold'> Tracer Study</span>.
      </span>
      <span className='text-2xl'>
        Keterlibatan Anda akan memberi andil terhadap upaya peningkatan kualitas Pendidikan di masa datang.
      </span>
    </div>
  )
}

export default SurveyContentStepThird