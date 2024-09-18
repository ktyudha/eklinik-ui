import { FunctionComponent } from 'react'
import useGlobalStore from '@store/useStore'
import SurveyTabItem from './SurveyTabItem'

const SurveyTab: FunctionComponent = () => {
  const {
    student,
  } = useGlobalStore((state) => ({
    student: state.student,
  }))

  return (
    <ul className="text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex border">
      <SurveyTabItem
        label='STEP 1 - DATA LULUSAN'
        isActive={student?.survey_status === 'working_on' || student?.survey_status === 'not_done_yet'}
      />
      <SurveyTabItem
        label='STEP 2 - DETAIL AKTIVITAS'
        isActive={student?.survey_status === 'progress'}
      />
    </ul>
  )
}

export default SurveyTab