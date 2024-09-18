import { FunctionComponent } from "react"
import { Question } from "@services/student/group/interfaces/get-all-group.types"
import useStudentStore from "@modules/student/_store/useStudentStore"
import QuestionItemInputRadio from "./QuestionItemInput/QuestionItemInputRadio"
import QuestionItemInputCheckbox from "./QuestionItemInput/QuestionItemInputCheckbox"

interface Props {
  question: Question
}

const QuestionItemWithRule: FunctionComponent<Props> = ({ question }) => {
  const {
    studentFirstStepAnswers
  } = useStudentStore((state) => ({
    studentFirstStepAnswers: state.studentFirstStepAnswers,
  }))

  const formatQuestion = (param: string) => {
    if (param.includes('**select-country**')) {
      return param.replace('**select-country**', '')
    } else if (param.includes('**select-province**')) {
      return param.replace('**select-province**', '')
    } else if (param.includes('**select-city**')) {
      return param.replace('**select-city**', '')
    } else if (param.includes('**select-university**')) {
      return param.replace('**select-university**', '')
    } else if (param.includes('**select-departement**')) {
      return param.replace('**select-departement**', '')
    } else {
      return param
    }
  }

  return (
    <div className='flex flex-col gap-2 border-b pb-5'>
      <div className='flex flex-col'>
        <h3 dangerouslySetInnerHTML={{ __html: formatQuestion(question.question) }} />
        <span className='italic text-sm'>{question.note}</span>
      </div>
      <div className='flex flex-col gap-3'>
        {question.answers.map((answer: any, idx: number) => {
          const answerData = studentFirstStepAnswers.find((answer) => answer.questionId === question.id)
          const existQuestionOnStudentAnswer = studentFirstStepAnswers.some((answer) => answer.questionId === question.id)

          if (question.type === 'radio') {
            return (
              <QuestionItemInputRadio
                key={`input-radio-${idx}`}
                questionId={question.id}
                label={answer.answer}
                value={answer.id}
                type={question.type}
                answerData={answerData}
                existQuestionOnStudentAnswer={existQuestionOnStudentAnswer}
                // onSetStudentAnswersCallback={onSetStudentAnswersCallback}
              />
            )
          }
          
          return (
            <QuestionItemInputCheckbox
              key={`input-checkbox-${idx}`}
              questionId={question.id}
              label={answer.answer}
              value={answer.id}
              type={question.type}
              existQuestionOnStudentAnswer={existQuestionOnStudentAnswer}
              // disabledAllWithoutThis={disabledAllWithoutThis}
              // onSetStudentAnswersCallback={onSetStudentAnswersCallback}
              // onSetDisabledAllCallback={onSetDisabledAllCallback}
            />
          )
        })}
      </div>
    </div>
  )
}

export default QuestionItemWithRule