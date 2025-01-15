import { FunctionComponent } from "react";
import { UilPlusCircle, UilMinusCircle } from "@iconscout/react-unicons";

interface Props {
  answers: Array<any>;
  onChangeAnswerCallback: (index: number, value: string) => void;
  onAddAnswerCallback: () => void;
  onRemoveAnswerCallback: (index: number) => void;
}

const SubMenuCreateContentAnswer: FunctionComponent<Props> = ({
  answers,
  onChangeAnswerCallback,
  onAddAnswerCallback,
  onRemoveAnswerCallback,
}) => {
  return (
    <>
      {answers.map((answer, i) => (
        <div key={`answer-${i}`} className="flex gap-3">
          <div className="flex-1">
            <div className="border-2 py-2 px-3 rounded-lg flex flex-wrap items-stretch w-full relative">
              <input
                key={`answer-${answer}`}
                className="flex-shrink flex-grow flex-auto leading-normal w-px border-0 outline-none"
                name="answer"
                type="text"
                placeholder={`Jawaban ${i + 1}`}
                defaultValue={answer || undefined}
                onChange={(e) => onChangeAnswerCallback(i, e.target.value)}
                required={i === 0}
              />
            </div>
          </div>

          {/* button */}
          {i === 0 ? (
            <div className="flex-none">
              <button
                onClick={() => onAddAnswerCallback()}
                type="button"
                className="box-border hover:box-content w-30 h-30 bg-[#3B82F6] hover:bg-blue-600 rounded-xl p-2 font-medium text-base leading-4 text-white"
              >
                <UilPlusCircle size="25" />
              </button>
            </div>
          ) : (
            <div className="flex-none">
              <button
                onClick={() => onRemoveAnswerCallback(i)}
                type="button"
                className="box-border hover:box-content w-30 h-30 bg-red-500 hover:bg-red-600 rounded-xl p-2 font-medium text-base leading-4 text-white"
              >
                <UilMinusCircle size="25" />
              </button>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default SubMenuCreateContentAnswer;
