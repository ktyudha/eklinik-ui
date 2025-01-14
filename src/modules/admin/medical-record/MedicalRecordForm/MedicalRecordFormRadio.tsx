import { FunctionComponent, useState, useRef } from "react";
import { formattedQuestion } from "@/helpers/format-question";
import { StudentAnswer } from "@modules/student/_store/slices/answer.slice";

interface Props {
  questionId: string;
  label?: string;
  value: string;
  type: string;
  answerData?: any;
  existQuestionOnStudentAnswer?: boolean;
  setAnswerCallback: (param: StudentAnswer) => void;
}

const MedicalRecordFormRadio: FunctionComponent<Props> = ({
  questionId,
  label,
  value,
  type = "radio",
  answerData,
  existQuestionOnStudentAnswer = false,
  setAnswerCallback,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [questionAnswerId, setQuestionAnswerId] = useState<string>("");
  const withInput = label && label.includes("**answer-option-with-input**");

  const onChangeValue = (param: string) => {
    setAnswerCallback({
      questionType: type,
      questionId: questionId,
      questionAnswerId: param,
    });
  };

  const onChangeAnswerInput = (param: string) => {
    setAnswerCallback({
      questionType: "answer-option-with-input",
      questionId: questionId,
      questionAnswerId: questionAnswerId,
      extraAnswer: param,
    });
  };

  const handleDivClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <div
        className="hover:border-green-500 border-2 py-[10px] px-3 rounded-lg w-full"
        onClick={handleDivClick}
      >
        <div className="flex items-center">
          <input
            ref={inputRef}
            className="w-4 h-4 focus:ring-0 focus:ring-offset-0 accent-green-600 focus:accent-green-600"
            id={`answer-${questionId}`}
            name={`answer-${questionId}`}
            type={type}
            value={value}
            onChange={(e) => {
              if (withInput) {
                // onChangeAnswer(e.target.value, !isChecked)
                setQuestionAnswerId(e.target.value);
                onChangeValue(e.target.value);
              } else {
                onChangeValue(e.target.value);
              }
            }}
            required={!existQuestionOnStudentAnswer}
          />
          <label htmlFor="answer" className="ms-2 text-sm">
            {formattedQuestion(label as string)}
          </label>
        </div>
      </div>
      {withInput &&
        answerData &&
        answerData.questionAnswerId === questionAnswerId && (
          <div className="border-2 py-2 px-3 rounded-lg flex flex-wrap items-stretch w-full">
            <input
              className="flex-shrink flex-grow flex-auto leading-normal w-px border-0 outline-none text-sm"
              name={`input-answer-${questionId}`}
              type="text"
              placeholder="Tulis Jawaban Anda"
              onChange={(e: any) => onChangeAnswerInput(e.target.value)}
              required
            />
          </div>
        )}
    </>
  );
};

export default MedicalRecordFormRadio;
