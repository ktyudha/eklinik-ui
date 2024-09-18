import { FunctionComponent, useState } from 'react'

interface Props {
  questionId: string
  label?: string
  value: string
  type: string
  answerData?: any
  existQuestionOnStudentAnswer?: boolean
  onSetStudentAnswersCallback: (questionType: string, questionId: string, questionAnswerId?: string | null, extraAnswer?: string) => void
}

const StepItemInputRadio: FunctionComponent<Props> = ({
  questionId,
  label,
  value,
  type = 'radio',
  answerData,
  existQuestionOnStudentAnswer = false,
  onSetStudentAnswersCallback,
}) => {
  const [questionAnswerId, setQuestionAnswerId] = useState<string>('')
  const withInput = label && label.includes('**answer-option-with-input**')
  const formatQuestion = (param: string) => {
    if (param.includes('**answer-option-with-input**')) {
      return param.replace('**answer-option-with-input**', '')
    } else {
      return param
    }
  }
  
  // const onChangeAnswer = (param: string, checked: boolean) => {
  //   setIsChecked(checked)
  //   if (withInput) {
  //     if (checked === true) {
  //       setQuestionAnswerId(param)
  //     } else {
  //       setQuestionAnswerId('')
  //       onSetStudentAnswersCallback(type, questionId, param)
  //     }
  //   } else {
  //     setQuestionAnswerId('')
  //     onSetStudentAnswersCallback(type, questionId, param)
  //   }
  // }

  const onChangeValue = (param: string) => {
    onSetStudentAnswersCallback(type, questionId, param)
  }

  const onChangeAnswerInput = (param: string) => {
    onSetStudentAnswersCallback('answer-option-with-input', questionId, questionAnswerId, param)
  }

  return (
    <>
      <div className='hover:border-green-500 border-2 py-[10px] px-3 rounded-lg w-full'>
        <div className="flex items-center">
          <input
            className="w-4 h-4 focus:ring-0 focus:ring-offset-0 accent-green-600 focus:accent-green-600"
            id={`answer-${questionId}`}
            name={`answer-${questionId}`}
            type={type}
            value={value}
            onChange={(e) => {
              if (withInput) {
                // onChangeAnswer(e.target.value, !isChecked)
                setQuestionAnswerId(e.target.value)
                onChangeValue(e.target.value)
              } else {
                onChangeValue(e.target.value)
              }
              // if (withInput) {
              //   if (!isChecked) {
              //     setQuestionAnswerId(e.target.value)
              //     setIsChecked(!isChecked)
              //   } else {
              //     if (answerInput !== '') {
              //       onSetStudentAnswersCallback(type, questionId, questionAnswerId)
              //     }
              //     setAnswerInput('')
              //     setIsChecked(!isChecked)
              //   }
              // } else {
              //   onChangeValue(e.target.value)
              // }
            }}
            required={!existQuestionOnStudentAnswer}
          />
          <label htmlFor="answer" className="ms-2 text-sm">{formatQuestion(label as string)}</label>
        </div>
      </div>
      {(withInput && (answerData && (answerData.questionAnswerId === questionAnswerId))) && (
        <div className='border-2 py-2 px-3 rounded-lg flex flex-wrap items-stretch w-full'>
          <input
            className="flex-shrink flex-grow flex-auto leading-normal w-px border-0 outline-none text-sm"
            name={`input-answer-${questionId}`}
            type='text'
            placeholder='Tulis Jawaban Anda'
            onChange={(e: any) => onChangeAnswerInput(e.target.value)}
            // onPointerOut={(e: any) => onChangeAnswerInput(e.target.value)}
            required
          />
        </div>
      )}
    </>
  )
}

export default StepItemInputRadio