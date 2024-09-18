import { FunctionComponent } from 'react'

interface Props {
  questionId: string
  onSetStudentAnswersCallback: (questionType: string, questionId: string, questionAnswerId?: string | null, extraAnswer?: string) => void
}

const StepItemInputText: FunctionComponent<Props> = ({
  questionId,
  onSetStudentAnswersCallback,
}) => {
  const onChangeAnswerInput = (param: string) => {
    onSetStudentAnswersCallback('text', questionId, null, param)
  }

  return (
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
  )
}

export default StepItemInputText