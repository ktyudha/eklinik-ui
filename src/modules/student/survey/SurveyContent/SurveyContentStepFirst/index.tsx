import { FunctionComponent, useCallback, useState, useEffect } from 'react'
import { UilAngleRightB } from '@iconscout/react-unicons'
import { StepProvider, useStep } from '@hooks/useStep'
import { toast } from 'react-toastify'
import { scrollToElement } from '@/helpers/form'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import Spinner from '@components/reusable/Spinner'
import useGlobalStore from '@store/useStore'
import useStudentStore from '@modules/student/_store/useStudentStore'
import useCreateStudentAnswer from '@services/student/student-answer/hooks/useCreateStudentAnswer'
import { StudentAnswer } from '../..'
import { Group } from '@services/student/group/interfaces/get-all-group.types'
import { ICreateStudentAnswerPayload } from '@services/student/student-answer/interfaces/create-student-answer.types'
import SurveyContentStepFirstProfile from './SurveyContentStepFirstProfile'
import SurveyContentStepFirstUpdate from './SurveyContentStepFirstUpdate'
import StepItem from '../StepItem'
import { useStudentGetMe } from '@services/auth/student-login/hooks/useStudentGetMe'

interface Props {
  groups: Group[]
}
type FormFields = ICreateStudentAnswerPayload

const SurveyContentStepFirst: FunctionComponent<Props> = ({
  groups
}) => {
  const {
    student,
    setStudent,
  } = useGlobalStore((state) => ({
    student: state.student,
    setStudent: state.setStudent,
  }))
  const {
    // activeSurveyTab,
    selectedMaritalStatus,
    selectedProvince,
    selectedCity,
    selectedSubDistrict,
    setActiveSurveyTab,
  } = useStudentStore((state) => ({
    // activeSurveyTab: state.activeSurveyTab,
    selectedMaritalStatus: state.selectedMaritalStatus,
    selectedProvince: state.selectedProvince,
    selectedCity: state.selectedCity,
    selectedSubDistrict: state.selectedSubDistrict,
    setActiveSurveyTab: state.setActiveSurveyTab,
  }))
  // State
  // const [studentMaritalStatus, setStudentMaritalStatus] = useState<string>('')
  // const [selectedStudentProvince, setSelectedStudentProvince] = useState<{ label: string, value: string } | null>()
  // const [selectedStudentCity, setSelectedStudentCity] = useState<{ label: string, value: string } | null>()
  // const [selectedStudentSubDistrict, setSelectedStudentSubDistrict] = useState<{ label: string, value: string } | null>()
  // Input
  const [studentAnswers, setStudentAnswers] = useState<Array<StudentAnswer>>([])
  const [currentStep, helpers] = useStep(groups?.length as number)
  const methods = useForm<any>({ mode: 'onChange', shouldFocusError: true })
  const { isSubmitting, isValid } = methods.formState

  // const onChangeMaritalStatusCallback = (param: string) => {
  //   setStudentMaritalStatus(param)
  // }

  // const onChangeStudentProvinceCallback = (param: any) => {
  //   setSelectedStudentProvince(param)
  // }

  // const onChangeStudentCityCallback = (param: any) => {
  //   setSelectedStudentCity(param)
  // }

  // const onChangeStudentSubDistrictCallback = (param: any) => {
  //   setSelectedStudentSubDistrict(param)
  // }

  const arrQuestionWithRule: any = []
  const onSetArrQuestionWithRule = useCallback((questionId: string) => {
    const exist = arrQuestionWithRule.some((question: any) => question === questionId)
    if (!exist) {
      arrQuestionWithRule.push(questionId)
    }
  }, [arrQuestionWithRule])

  const onSetStudentAnswersCallback = useCallback(
    (questionType: string, questionId: string, questionAnswerId?: string | null, extraAnswer?: string) => {

    if (questionType === 'checkbox' || questionType === 'answer-option-with-input') {
      const isExistAnswer = studentAnswers.some(
        (val: StudentAnswer) => val.questionId === questionId && val.questionAnswerId === questionAnswerId)

      if (!isExistAnswer) {
        return setStudentAnswers((prevVal) => [...prevVal, {
          questionType: questionType,
          questionId: questionId,
          questionAnswerId: questionAnswerId,
          extraAnswer: extraAnswer,
        }])
      }

      const index = studentAnswers.findIndex(x => x.questionId === questionId && x.questionAnswerId === questionAnswerId)
      if (questionType === 'answer-option-with-input') {
        const item = studentAnswers[index]
        item.extraAnswer = extraAnswer
        studentAnswers[index] = item
        return setStudentAnswers(studentAnswers)
      }

      // update array value
      const newArrAnswers = studentAnswers.filter((_, i) => i !== index)
      return setStudentAnswers([...newArrAnswers])
    }

    if (
        questionType === '**select-country**' ||
        questionType === '**select-province**' ||
        questionType === '**select-city**' ||
        questionType === '**select-university**' ||
        questionType === '**select-departement**'
      ) {
      const index = studentAnswers.findIndex(x => x.questionId === questionId)
      const isExistAnswer = studentAnswers.some((val: StudentAnswer) => val.questionId === questionId)
      if (!isExistAnswer) {
        // add to array state
        return setStudentAnswers((prevVal) => [...prevVal, {
          questionType: questionType,
          questionId: questionId,
          questionAnswerId: questionAnswerId,
          extraAnswer: extraAnswer,
        }])
      } else if (extraAnswer === '') {
        // delete from array state
        const newArrAnswers = studentAnswers.filter((_, i) => i !== index)
        return setStudentAnswers([...newArrAnswers])
      } else {
        // update value on array state
        const newArrAnswers: any = []
        studentAnswers.map((val, idx) => {
          if (idx < index) {
            newArrAnswers.push(val)
          }
        })

        return setStudentAnswers([...newArrAnswers, {
          questionId: questionId,
          questionAnswerId: questionAnswerId,
          extraAnswer: extraAnswer,
        }])
      }
    }

    const isExistAnswer = studentAnswers.some((val: StudentAnswer) => val.questionId === questionId)
    if (!isExistAnswer) {
      // set answer to state
      return setStudentAnswers((prevVal) => [...prevVal, {
        questionType: questionType,
        questionId: questionId,
        questionAnswerId: questionAnswerId,
        extraAnswer: extraAnswer,
      }])
    }

    // update answer value on state
    const index = studentAnswers.findIndex(x => x.questionId === questionId)
    const newArrAnswers: any = []
    studentAnswers.map((val, idx) => {
      if (idx > index && !arrQuestionWithRule.some((id: any) => id === val.questionId) || idx < index) {
        newArrAnswers.push(val)
      }
      // if (idx < index) {
      //   newArrAnswers.push(val)
      // }
    })

    return setStudentAnswers([...newArrAnswers, {
      questionId: questionId,
      questionAnswerId: questionAnswerId,
      extraAnswer: extraAnswer,
    }])
  }, [studentAnswers])

  const { createStudentAnswer } = useCreateStudentAnswer()
  const onSubmit: SubmitHandler<FormFields> = async (state) => {
    const arrQuestionId: any = []
    const arrQuestionAnswerId: any = []
    const arrExtraAnswer: any = []

    studentAnswers.map((answer) => {
      arrQuestionId.push(answer.questionId)
      arrQuestionAnswerId.push(answer.questionAnswerId)
      arrExtraAnswer.push(answer.extraAnswer ?? null)
    })

    const { error, response } = await createStudentAnswer({
      studentId: student?.id as string,
      // groupStep: activeSurveyTab,
      groupStep: 1,
      questionId: arrQuestionId,
      questionAnswerId: arrQuestionAnswerId,
      extraAnswer: arrExtraAnswer,

      // profile payload
      surveyStatus: groups.length === currentStep ? 'progress' : 'working_on',
      graduationYear: state.graduationYear,
      phoneNumber: state.phoneNumber,
      email: state.email,
      // maritalStatus: studentMaritalStatus,
      // provinceId: selectedStudentProvince?.value,
      // cityId: selectedStudentCity?.value,
      // subDistrictId: selectedStudentSubDistrict?.value,
      maritalStatus: selectedMaritalStatus,
      provinceId: selectedProvince?.value,
      cityId: selectedCity?.value,
      subDistrictId: selectedSubDistrict?.value,
      village: state.village,
      address: state.address,
      rt: state.rt,
      rw: state.rw,
    })
    if (error || response) {
      if (error) {
        toast.error("Gagal Submit Jawaban", {
          position: toast.POSITION.TOP_CENTER,
        })
      } else {
        // reset state
        setStudentAnswers([])

        if (currentStep === groups?.length) {
          // setActiveSurveyTab(activeSurveyTab + 1)
          setActiveSurveyTab(2)
          // rerender student data
          const { data, error, status } = await useStudentGetMe()
          if (!error && status === 200 && data) {
            if (data.role === 'student') {
              setStudent(data.user)
            }
          }
        } else {
          helpers.setStep(currentStep + 1)
        }
      }
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        onInvalid={(e) => {
          e.preventDefault()
          const element = e.target as EventTarget & HTMLFormElement
          scrollToElement(element, 250)
        }}
      >
        <div className='flex flex-col gap-5'>
          <SurveyContentStepFirstProfile />
          <SurveyContentStepFirstUpdate
            // selectedStudentProvince={selectedStudentProvince}
            // selectedStudentCity={selectedStudentCity}
            // selectedStudentSubDistrict={selectedStudentSubDistrict}
            // onChangeMaritalStatusCallback={onChangeMaritalStatusCallback}
            // onChangeStudentProvinceCallback={onChangeStudentProvinceCallback}
            // onChangeStudentCityCallback={onChangeStudentCityCallback}
            // onChangeStudentSubDistrictCallback={onChangeStudentSubDistrictCallback}
          />

          <StepProvider values={{ currentStep, helpers }}>
            {groups.map((group, idx) => {
              if ((idx + 1) === currentStep) {
                return (
                  <div key={`group-item-${idx}`} className='border border-green-500 rounded-md'>
                    {/* Content Header */}
                    <div className='bg-green-500 rounded-t-md p-3'>
                      <span className='text-white font-semibold'>{group.name}</span>
                    </div>
      
                    {/* Content Body */}
                    <div className='flex flex-col gap-3 py-4 px-5'>
                      {group.group_questions.map((groupQuestion, idx) => {
                        return (
                          <StepItem
                            key={`question-${groupQuestion.id}-${idx}`}
                            question={groupQuestion.question}
                            studentAnswers={studentAnswers}
                            loadingUniversity={false}
                            countryOptions={[]}
                            provinceOptions={[]}
                            cityOptions={[]}
                            universityOptions={[]}
                            departementOptions={[]}
                            selectedUniversity={{ label: '', value: '' }}
                            selectedDepartement={{ label: '', value: '' }}
                            selectedProvince={{ label: '', value: '' }}
                            selectedCity={{ label: '', value: '' }}
                            disabledAllWithoutThis={[]}
                            onSetStudentAnswersCallback={onSetStudentAnswersCallback}
                            onChangeUniversityCallback={(e) => e}
                            onSearchUniversityCallback={(e) => e}
                            onChangeDepartmentCallback={(e) => e}
                            onSearchDepartmentCallback={(e) => e}
                            onChangeProvinceCallback={(e) => e}
                            onChangeCityCallback={(e) => e}
                            onSetArrQuestionWithRule={onSetArrQuestionWithRule}
                            onSetDisabledAllCallback={(e) => e}
                          />
                        )
                      })}
                    </div>
                  </div>
                )
              }
            })}
          </StepProvider>

          {/* button */}
          <div className='flex items-center justify-end'>
            <button
              type='submit'
              className={`w-full md:w-56 flex items-center justify-center gap-1 px-3 py-[8px] rounded-lg text-white ${!isValid || isSubmitting ? 'bg-green-300 cursor-not-allowed focus:outline-none disabled:opacity-100' : 'bg-green-500 hover:bg-green-600'}`}
              disabled={!isValid || isSubmitting}
            >
              <span className='text-white'>
                {!isSubmitting ? 'Simpan dan Lanjut' : <Spinner />}
              </span>
              <div className='pt-[3px]'>
                <UilAngleRightB color='white' size='20' />
              </div>
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default SurveyContentStepFirst