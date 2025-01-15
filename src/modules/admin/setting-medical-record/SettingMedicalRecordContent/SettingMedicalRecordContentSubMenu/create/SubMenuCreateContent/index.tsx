import { FunctionComponent, useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
// import Textarea from "@/components/reusable/Form/Textarea";
import Spinner from "@/components/reusable/Spinner";
import Select from "@/components/reusable/Form/Select";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useGetAllMenu from "@/services/admin/menu/hooks/useGetAllMenu";
import useMapInputOptions from "@/hooks/useMapInputOptions";
import useCreateSubMenu from "@/services/admin/menu/hooks/useCreateSubMenu";
import { ICreateOrUpdateSubMenuPayload } from "@/services/admin/menu/interfaces/create-or-update-sub-menu.types";
import SubMenuCreateContentAnswer from "./SubMenuCreateAnswer";
import { QUILL_FORMAT, QUILL_MODULE } from "@/constant/quill";
import { QUESTION_TYPE, STATUS } from "@/constant/utils";

type FormFields = ICreateOrUpdateSubMenuPayload;

const SubMenuCreateContent: FunctionComponent = () => {
  // const location = useLocation();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Array<string>>([""]);
  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid && answers.length > 0;

  const { menus } = useGetAllMenu();
  const menuOptions = useMapInputOptions(menus);

  const onChangeAnswerCallback = (index: number, value: string) => {
    return (answers[index] = value);
  };

  const onAddAnswerCallback = () => {
    return setAnswers((value) => [...value, ""]);
  };

  const onRemoveAnswerCallback = (param: number) => {
    const newAnswers = answers.filter((_, i) => i !== param);
    return setAnswers(newAnswers);
  };

  const onChangeSubMenuValue = (param: string) => {
    methods.setValue("name", param);
  };

  // const onChangeShowInReport = (param: boolean) => {
  //   methods.setValue("is_active", param);
  // };

  const { createSubMenu } = useCreateSubMenu();
  const onSubmit: SubmitHandler<any> = async (state) => {
    // const filterAnswers = answers.filter((answer) => answer !== "");
    const arrAnswerSequence: any = [];
    answers
      .filter((answer) => answer !== "")
      .map((_, i) => {
        arrAnswerSequence.push(i + 1);
      });
    // const questionType = state.type;
    const { error, response } = await createSubMenu({
      ...state,
      // answer:
      //   questionType !== "text" && questionType !== "date"
      //     ? filterAnswers
      //     : null,
      // answerSequence: arrAnswerSequence,
      // gradeId: location.state.gradeId,
    });
    if (error || response) {
      if (error) {
        toast.error("Gagal Menambah Pertanyaan", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.success("Sukses Manambah Pertanyaan", {
          position: toast.POSITION.TOP_CENTER,
        });

        navigate("/admin/settings/medical-record");
      }
    }
  };

  console.log(methods.getValues("type"));
  useEffect(() => {
    // methods.watch("is_active");
    if (methods.watch("type")) {
      setAnswers([""]);
    }
    // if (
    //   methods.watch("type") !== "radio" ||
    //   methods.watch("type") !== "checkbox"
    // ) {
    //   onChangeShowInReport(false);
    // }
  }, [methods]);

  return (
    <div className="grid grid-cols-12">
      <div className="mt-5 rounded-lg p-5 border col-span-12 border-[#E2E8F0] bg-white">
        <FormProvider {...methods}>
          <form className="w-full" onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-2 sm:grid-cols-1 md:gap-5 sm:gap-3">
              {/* Question */}
              <div className="col-span-1">
                <h2 className="mb-3 text-lg font-medium leading-4">
                  Data Pertanyaan
                </h2>
                <div className="flex flex-col gap-3 mb-3">
                  <Select
                    label="Grup Pertanyaan"
                    name="menu_id"
                    textTransform="uppercase"
                    selectOptions={menuOptions}
                    isRequired
                    // defaultValue={location.state.gradeId ?? undefined}
                    // isDisabled
                  />

                  <div className="flex flex-col">
                    <label className="flex gap-1 font-normal text-md leading-4 text-[#1E293B] mb-2">
                      Pertanyaan <div className="text-red-500">*</div>
                    </label>
                    <ReactQuill
                      theme="snow"
                      className="border-2 rounded-lg"
                      modules={QUILL_MODULE}
                      formats={QUILL_FORMAT}
                      placeholder="Tulis pertanyaan disini..."
                      onChange={onChangeSubMenuValue}
                    />
                  </div>

                  <Select
                    label="Tipe Pertanyaan"
                    name="type"
                    selectOptions={QUESTION_TYPE}
                    isRequired
                  />

                  <Select
                    label="Status"
                    name="is_active"
                    selectOptions={STATUS}
                    isRequired
                  />

                  {/* <Textarea
                    label="Catatan"
                    name="note"
                    placeholder="Tulis catatan disini..."
                  /> */}

                  {/* {(methods.getValues("type") === "radio" ||
                    methods.getValues("type") === "checkbox") && (
                    <div className="flex flex-col">
                      <label className="flex gap-1 font-normal text-md leading-4 text-[#1E293B] mb-2">
                        Tampilkan pada diagram ?
                      </label>
                      <div className="flex gap-3">
                        <label>
                          <input
                            type="radio"
                            id="showInReport1"
                            name="showInReport"
                            className="hidden peer"
                            onClick={() => onChangeShowInReport(true)}
                          />
                          <div className="w-20 py-1 text-center border-2 rounded-lg peer-checked:bg-blue-600 peer-checked:text-white">
                            <span className="text-md">Ya</span>
                          </div>
                        </label>
                        <label>
                          <input
                            type="radio"
                            id="showInReport2"
                            name="showInReport"
                            className="hidden peer"
                            onClick={() => onChangeShowInReport(false)}
                            defaultChecked
                          />
                          <div className="w-20 py-1 text-center border-2 rounded-lg peer-checked:bg-blue-600 peer-checked:text-white">
                            <span className="text-md">Tidak</span>
                          </div>
                        </label>
                      </div>
                    </div>
                  )} */}
                </div>
              </div>

              {/* Answer */}
              <div className="col-span-1">
                <h2 className="mb-3 text-lg font-medium leading-4">
                  Data Jawaban
                </h2>

                <div className="flex flex-col gap-3">
                  {(methods.getValues("type") === "radio" ||
                    methods.getValues("type") === "checkbox") && (
                    <div className="flex flex-col gap-3">
                      <SubMenuCreateContentAnswer
                        answers={answers}
                        onChangeAnswerCallback={onChangeAnswerCallback}
                        onAddAnswerCallback={onAddAnswerCallback}
                        onRemoveAnswerCallback={onRemoveAnswerCallback}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-end w-full gap-3 mt-5 md:flex-row">
              <button
                type="button"
                className="px-20 py-3 text-base font-medium leading-4 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
                onClick={() => navigate("/admin/settings/medical-record")}
              >
                Kembali
              </button>
              <button
                type="submit"
                className={`rounded-lg px-20 py-3 font-medium text-base leading-4 text-white ${
                  !isValid || isSubmitting
                    ? "bg-[#9fe194] cursor-not-allowed focus:outline-none disabled:opacity-100"
                    : "bg-[#4bb43a] hover:bg-[#379029]"
                }`}
                disabled={!isValid || isSubmitting}
              >
                {!isSubmitting ? "Submit" : <Spinner />}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default SubMenuCreateContent;
