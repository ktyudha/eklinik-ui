import { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react'
import { UilAngleRightB } from '@iconscout/react-unicons'
import useGlobalStore from '@store/useStore'
import useStudentStore from '@modules/student/_store/useStudentStore'
import { scrollToElement } from '@/helpers/form'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { StepProvider, useStep } from '@hooks/useStep'
import { toast } from 'react-toastify'
import Spinner from '@components/reusable/Spinner'
import useCreateStudentAnswer from '@services/student/student-answer/hooks/useCreateStudentAnswer'
import useGetAllProvince from '@services/global/region/province/hooks/useGetAllProvince'
import useGetAllCountry from '@services/global/region/country/hooks/useGetAllCountry'
import useGetAllUniversity from '@services/global/study/university/hooks/useGetAllUniversity'
import { StudentAnswer } from '..'
import { Group } from '@services/student/group/interfaces/get-all-group.types'
import StepItem from './StepItem'
import useGetAllDepartement from '@services/global/study/departement/hooks/useGetAllDepartement'
import { useStudentGetMe } from '@services/auth/student-login/hooks/useStudentGetMe'

interface Props {
  groups: Group[]
}

const SurveyContentStepSecond: FunctionComponent<Props> = ({
  groups,
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
    setActiveSurveyTab,
  } = useStudentStore((state) => ({
    // activeSurveyTab: state.activeSurveyTab,
    setActiveSurveyTab: state.setActiveSurveyTab,
  }))
  // input state
  const [disabledAllWithoutThis, setDisabledAllWithoutThis] = useState<Array<{ questionId: string, questionAnswerId: string }>>([])
  const [selectedUniversity, setSelectedUniversity] = useState<{ label: string, value: string } | null>()
  const [selectedDepartement, setSelectedDepartement] = useState<{ label: string, value: string } | null>()
  const [selectedProvince, setSelectedProvince] = useState<{ label: string, value: string } | null>()
  const [selectedCity, setSelectedCity] = useState<{ label: string, value: string } | null>()
  const [studentAnswers, setStudentAnswers] = useState<Array<StudentAnswer>>([])
  const [currentStep, helpers] = useStep(groups?.length as number)
  const methods = useForm<any>({ mode: 'onChange', shouldFocusError: true })
  const { isSubmitting, isValid } = methods.formState

  const { countries, loading: loadingCountry } = useGetAllCountry()
  const { universities, loading: loadingUniversity, setName: setUniversityName } = useGetAllUniversity()
  const { departments, loading: loadingDepartment, setName: setDepartmentName, setUniversityId } = useGetAllDepartement()
  const { provinces, loading: loadingProvince } = useGetAllProvince()

  const arrQuestionWithRule: any = []
  const onSetArrQuestionWithRule = useCallback((questionId: string) => {
    const exist = arrQuestionWithRule.some((question: any) => question === questionId)
    if (!exist) {
      arrQuestionWithRule.push(questionId)
    }
  }, [arrQuestionWithRule])

  const onSetStudentAnswersCallback = useCallback(
    (questionType: string, questionId: string, questionAnswerId?: string | null, extraAnswer?: string) => {

    if (questionType === 'checkbox' || questionType === 'answer-option-with-input' || 'disabled-all') {
      const isExistAnswer = studentAnswers.some(
        (val: StudentAnswer) => val.questionId === questionId && val.questionAnswerId === questionAnswerId)

      if (!isExistAnswer) {
        if (questionType === 'disabled-all') {
          // remove answer option without unique option
          const newStudentAnswers = studentAnswers.filter(data => data.questionId !== questionId && data.questionAnswerId !== questionAnswerId)
          return setStudentAnswers([...newStudentAnswers, {
            questionType: questionType,
            questionId: questionId,
            questionAnswerId: questionAnswerId,
          }])
        }

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
        if (questionType === '**select-university**') {
          // remove department value from student_answers
          const questionDepartmentData = studentAnswers.find((answer) => answer.questionType === '**select-departement**')
          if (questionDepartmentData) {
            const indexDepartment = studentAnswers.findIndex(x => x.questionId === questionDepartmentData.questionId)
            // without university & department data
            const newArrAnswers = studentAnswers.filter((_, i) => i !== indexDepartment && i !== index)
            return setStudentAnswers([...newArrAnswers])
          }
        }

        if (questionType === '**select-province**') {
          // remove department value from student_answers
          const questionCityData = studentAnswers.find((answer) => answer.questionType === '**select-city**')
          if (questionCityData) {
            const indexCity = studentAnswers.findIndex(x => x.questionId === questionCityData.questionId)
            // without university & city data
            const newArrAnswers = studentAnswers.filter((_, i) => i !== indexCity && i !== index)
            return setStudentAnswers([...newArrAnswers])
          }
        }

        // delete from array state
        const newArrAnswers = studentAnswers.filter((_, i) => i !== index)
        return setStudentAnswers([...newArrAnswers])
      } else {
        // update value on array state
        const newArrAnswers: any = []
        studentAnswers.map((val, idx) => {
          // jika index pertanyaan pada state lebih kecil dari index pertanyaan yang dibuat
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

  const onChangeUniversityCallback = (param: any) => {
    setSelectedUniversity(param)
  }

  const onChangeDepartmentCallback = (param: any) => {
    setSelectedDepartement(param)
  }

  const onSearchUniversityCallback = (param: string) => {
    if (param === '') {
      setUniversityName('')
    } else {
      setUniversityName(param)
    }
  }

  const onSearchDepartmentCallback = (param: string) => {
    if (param === '') {
      setDepartmentName('')
    } else {
      setDepartmentName(param)
    }
  }

  const onChangeProvinceCallback = (param: any) => {
    setSelectedProvince(param)
  }

  const onChangeCityCallback = (param: any) => {
    setSelectedCity(param)
  }

  const onSetDisabledAllCallback = (val: { questionId: string, questionAnswerId: string }) => {
    const isExist = disabledAllWithoutThis.some((data) => data.questionId === val.questionId)
    if (!isExist) {
      return setDisabledAllWithoutThis((prevVal) => [...prevVal, {
        questionId: val.questionId,
        questionAnswerId: val.questionAnswerId,
      }])
    }

    const newArr = disabledAllWithoutThis.filter(x => x.questionId !== val.questionId)
    return setDisabledAllWithoutThis([...newArr])
  }

  const { createStudentAnswer } = useCreateStudentAnswer()
  const onSubmit: SubmitHandler<any> = async () => {
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
      groupStep: 2,
      questionId: arrQuestionId,
      questionAnswerId: arrQuestionAnswerId,
      extraAnswer: arrExtraAnswer,
      surveyStatus: groups.length === currentStep ? 'finished' : 'progress',
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
          setActiveSurveyTab(3)
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

  const countryOptions = useMemo(() => {
    if (!loadingCountry && countries) {
      return countries
    }
    return []
  }, [loadingCountry])

  const provinceOptions = useMemo(() => {
    if (!loadingProvince && provinces) {
      return provinces
    }
    return []
  }, [loadingProvince])

  const cityOptions = (!loadingProvince && provinces) ? provinces?.find((province) => province.id === selectedProvince?.value)?.cities : []

  const universityOptions = (!loadingUniversity && universities) ? universities : []
  const departementOptions = (!loadingDepartment && departments) && selectedUniversity?.value !== undefined ? departments : []

  useEffect(() => {
    setUniversityId(selectedUniversity?.value as string)
  }, [selectedUniversity])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentStep])

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
                            loadingUniversity={loadingUniversity}
                            countryOptions={countryOptions}
                            provinceOptions={provinceOptions}
                            cityOptions={cityOptions}
                            universityOptions={universityOptions}
                            departementOptions={departementOptions}
                            selectedUniversity={selectedUniversity}
                            selectedDepartement={selectedDepartement}
                            selectedProvince={selectedProvince}
                            selectedCity={selectedCity}
                            disabledAllWithoutThis={disabledAllWithoutThis}
                            onSetStudentAnswersCallback={onSetStudentAnswersCallback}
                            onChangeUniversityCallback={onChangeUniversityCallback}
                            onSearchUniversityCallback={onSearchUniversityCallback}
                            onChangeDepartmentCallback={onChangeDepartmentCallback}
                            onSearchDepartmentCallback={onSearchDepartmentCallback}
                            onChangeProvinceCallback={onChangeProvinceCallback}
                            onChangeCityCallback={onChangeCityCallback}
                            onSetArrQuestionWithRule={onSetArrQuestionWithRule}
                            onSetDisabledAllCallback={onSetDisabledAllCallback}
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
                {!isSubmitting ? (currentStep === groups?.length ? 'Simpan' : 'Simpan dan Lanjut') : <Spinner />}
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



export default SurveyContentStepSecond