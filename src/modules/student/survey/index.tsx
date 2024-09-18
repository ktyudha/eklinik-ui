import { FunctionComponent, useEffect } from 'react'
import useGlobalStore from '@store/useStore'
import useGetAllGroup from '@services/student/group/hooks/useGetAllGroup'
import SurveyContentStepFirst from './SurveyContent/SurveyContentStepFirst'
import SurveyTab from './SurveyTab'
import SurveyContentStepThird from './SurveyContent/SurveyContentStepThird'
import SurveySkeleton from './SurveySkeleton'
import SurveyContentStepSecond from './SurveyContent/SurveyContentStepSecond'

export interface StudentAnswer {
  questionType: string
  questionId: string
  questionAnswerId?: string | null
  extraAnswer?: string
}

const SurveyHome: FunctionComponent = () => {
  const {
    student,
  } = useGlobalStore((state) => ({
    student: state.student,
  }))
  const { groups, loading, setStep } = useGetAllGroup()

  useEffect(() => {
    if (student?.survey_status === 'not_done_yet' || student?.survey_status === 'working_on') {
      setStep(1)
    } else if (student?.survey_status === 'progress') {
      setStep(2)
    }
  }, [student])

  if (loading || !groups) return <SurveySkeleton />

  return (
    <div className='max-w-full px-3'>
      {(student?.survey_status !== 'finished') ? (
        <div className='flex flex-col gap-5 pb-5'>
          <SurveyTab />

          <div>
            {(student?.survey_status === 'working_on' || student?.survey_status === 'not_done_yet') ? (
              <SurveyContentStepFirst
                groups={groups}
              />
            ) : student?.survey_status === 'progress' && (
              <SurveyContentStepSecond
                groups={groups}
              />
            )}
          </div>
        </div>
      ) : (
        <SurveyContentStepThird />
      )}
    </div>
  )
}

export default SurveyHome