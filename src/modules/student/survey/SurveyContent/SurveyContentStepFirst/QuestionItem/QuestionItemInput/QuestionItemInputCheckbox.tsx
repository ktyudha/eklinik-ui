import useStudentStore from '@modules/student/_store/useStudentStore'
import { FunctionComponent, useState } from 'react'

interface Props {
  questionId: string
  label?: string
  value: string
  type: string
  existQuestionOnStudentAnswer?: boolean
  // disabledAllWithoutThis: Array<{ questionId: string, questionAnswerId: string }>
  // onSetStudentAnswersCallback: (questionType: string, questionId: string, questionAnswerId?: string | null, extraAnswer?: string) => void
  // onSetDisabledAllCallback: (val: { questionId: string, questionAnswerId: string }) => void
}

const QuestionItemInputCheckbox: FunctionComponent<Props> = ({
  questionId,
  label,
  value,
  type = 'radio',
  existQuestionOnStudentAnswer = false,
  // disabledAllWithoutThis,
  // onSetStudentAnswersCallback,
  // onSetDisabledAllCallback,
}) => {
  const {
    studentFirstStepAnswers,
    setStudentFirstStepAnswers
  } = useStudentStore((state) => ({
    studentFirstStepAnswers: state.studentFirstStepAnswers,
    setStudentFirstStepAnswers: state.setStudentFirstStepAnswers,
  }))
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [questionAnswerId, setQuestionAnswerId] = useState<string>('')
  const [answerInput, setAnswerInput] = useState<string>('')
  const withInput = label && label.includes('**answer-option-with-input**')
  const withDisabled = label && label.includes('**disabled-all**')
  // const isDisableThis = disabledAllWithoutThis.some(val => val.questionId === questionId)

  const formatQuestion = (param: string) => {
    if (param.includes('**answer-option-with-input**')) {
      return param.replace('**answer-option-with-input**', '')
    } else if (param.includes('**disabled-all**')) {
      return param.replace('**disabled-all**', '')
    } else {
      return param
    }
  }

  const onChangeValue = (param: string) => {
    // onSetStudentAnswersCallback(type, questionId, param)
    setStudentFirstStepAnswers([...studentFirstStepAnswers, {
      questionType: type,
      questionId: questionId,
      questionAnswerId: param
    }])
  }

  const onChangeAnswerInput = (param: string) => {
    setAnswerInput(param)
    // onSetStudentAnswersCallback('answer-option-with-input', questionId, questionAnswerId, param)
    setStudentFirstStepAnswers([...studentFirstStepAnswers, {
      questionType: 'answer-option-with-input',
      questionId: questionId,
      questionAnswerId: questionAnswerId,
      extraAnswer: param
    }])
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
                if (!isChecked) {
                  setQuestionAnswerId(e.target.value)
                  setIsChecked(!isChecked)
                } else {
                  if (answerInput !== '') {
                    // onSetStudentAnswersCallback(type, questionId, e.target.value)
                    setStudentFirstStepAnswers([...studentFirstStepAnswers, {
                      questionType: type,
                      questionId: questionId,
                      questionAnswerId: e.target.value
                    }])
                  }
                  setAnswerInput('')
                  setIsChecked(!isChecked)
                }
              } else if (withDisabled) {
                // onSetStudentAnswersCallback('disabled-all', questionId, e.target.value)
                setStudentFirstStepAnswers([...studentFirstStepAnswers, {
                  questionType: 'disabled-all',
                  questionId: questionId,
                  questionAnswerId: e.target.value
                }])
                // onSetDisabledAllCallback({ questionId: questionId, questionAnswerId: e.target.value })
              } else {
                onChangeValue(e.target.value)
              }
            }}
            required={!existQuestionOnStudentAnswer}
            // checked={!withDisabled ? isDisableThis ? false : undefined : undefined}
            // disabled={isDisableThis && !withDisabled}
          />
          <label htmlFor="answer" className="ms-2 text-sm">{formatQuestion(label as string)}</label>
        </div>
      </div>
      {(withInput && isChecked) && (
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

export default QuestionItemInputCheckbox