import {
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import Loader from '@/components/reusable/Loader'
import Cookies from 'js-cookie'
import { useLocation, useNavigate } from 'react-router-dom'
import { shallow } from 'zustand/shallow'
import { useStudentGetMe } from '@/services/auth/student-login/hooks/useStudentGetMe'
import useGlobalStore from '@store/useStore'

const StudentMiddleware: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const {
    student,
    userRole,
    setStudent,
    setUserRole,
  } = useGlobalStore((state) => ({
    student: state.student,
    userRole: state.userRole,
    setStudent: state.setStudent,
    setUserRole: state.setUserRole,
  }), shallow)
  const [mounted, setMounted] = useState(false)
  const cookie = Cookies.get('token-student')
  const ignoreRefetch = useRef(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const getStudentData = useCallback(async () => {
    const { data, error, status } = await useStudentGetMe()
    if (!error && status === 200 && data) {
      setUserRole(data.role)
      if (data.role === 'student') {
        setStudent(data.user)
      }
    } else {
      navigate('/alumni/login', { replace: true })
    }
    setMounted(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (cookie && !student && !ignoreRefetch.current) {
      getStudentData()
    } else if (cookie && student) {
      if (pathname === '/alumni/login') {
        if (userRole === 'student') {
          navigate('/student/survey')
        }
      }
      setMounted(true)
    } else if (!cookie) {
      if (pathname !== '/alumni/login') {
        navigate('/alumni/login')
      }
      setMounted(true)
    }

    ignoreRefetch.current = true
  }, [cookie, navigate, getStudentData, pathname, student, userRole])

  return <>{mounted ? children : <Loader />}</>
}

export default StudentMiddleware
