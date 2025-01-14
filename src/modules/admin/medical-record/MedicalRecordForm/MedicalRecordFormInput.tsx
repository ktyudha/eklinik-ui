import { FunctionComponent } from "react";
import { StudentAnswer } from "@modules/student/_store/slices/answer.slice";

interface Props {
  questionId: string;
  setAnswerCallback: (param: StudentAnswer) => void;
}

const MedicalRecordFormInput: FunctionComponent<Props> = ({
  questionId,
  setAnswerCallback,
}) => {
  const onChangeAnswerInput = (param: string) => {
    setAnswerCallback({
      questionType: "text",
      questionId: questionId,
      questionAnswerId: null,
      extraAnswer: param,
    });
  };

  return (
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
  );
};

export default MedicalRecordFormInput;
