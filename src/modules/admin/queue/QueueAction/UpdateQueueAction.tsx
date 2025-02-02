import { FunctionComponent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  Controller,
} from "react-hook-form";
import ReactQuill from "react-quill";
import { QUILL_FORMAT, QUILL_MODULE } from "@/constant/quill";
import { formatToInputDate } from "@/helpers/date";
import Spinner from "@/components/reusable/Spinner";
import Select from "@/components/reusable/Form/Select";
import Input from "@/components/reusable/Form/Input";
import useUpdateQueue from "@/services/admin/queue/hooks/useUpdateQueue";
import useGetQueue from "@/services/admin/queue/hooks/useGetQueue";
import { IUpdateQueuePayload } from "@/services/admin/queue/interfaces/update-queue.types";

type FormFields = IUpdateQueuePayload;

const UpdateQueueAction: FunctionComponent = () => {
  const navigate = useNavigate();
  const param = useParams();

  const { queue, loading } = useGetQueue(param.id as string);

  const statusOptions = [
    { label: "Finished", value: "finished" },
    { label: "Waiting", value: "waiting" },
    { label: "Cancel", value: "cancel" },
  ];

  // console.log(formatToInputDate(queue?.queue_date as string));
  const methods = useForm<FormFields>({ mode: "onChange" });
  const { control } = methods;
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

  const onChangeComplaintValue = (param: string) => {
    methods.setValue("description", param);
  };

  const { updateQueue } = useUpdateQueue(queue?.id as string);
  const onSubmit: SubmitHandler<FormFields> = async (state) => {
    const { error, response } = await updateQueue(state);

    if (error || response) {
      if (error) {
        toast.error("Gagal Menambahkan Antrian", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.success("Sukses Menambahkan Antrian", {
          position: toast.POSITION.TOP_CENTER,
        });
        methods.reset();
        navigate("/admin/outpatient/appointments");
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-3xl font-bold leading-9 text-black">
          Tambah Antrian
        </h1>
      </div>

      <div className="grid grid-cols-12">
        <div className="mt-5 rounded-lg p-5 border col-span-12 border-[#E2E8F0] bg-white">
          {loading ? (
            <div>...Loading</div>
          ) : (
            <>
              <FormProvider {...methods}>
                <form
                  className="w-full"
                  onSubmit={methods.handleSubmit(onSubmit)}
                >
                  <div className="md:gap-5 sm:gap-3">
                    <div className="col-span-1">
                      <div className="flex flex-col gap-5 mb-3">
                        <Input
                          label="Pasien"
                          type="text"
                          name="patient_id"
                          placeholder="Nama Pasien"
                          defaultValue={queue?.patient.name.toUpperCase()}
                          isReadOnly
                        />

                        <Input
                          type="datetime-local"
                          label="Tanggal"
                          name="queue_date"
                          placeholder="Pilih Tanggal"
                          defaultValue={formatToInputDate(
                            queue?.queue_date as string
                          )}
                        />

                        <Select
                          label="Status"
                          name="status"
                          isRequired
                          selectOptions={statusOptions}
                          defaultValue={queue?.status}
                        />

                        <div className="flex flex-col">
                          <label className="flex gap-1 font-normal text-md leading-4 text-[#1E293B] mb-2">
                            Keluhan <div className="text-red-500">*</div>
                          </label>
                          <Controller
                            name="description"
                            control={control}
                            defaultValue={queue?.description || ""}
                            render={({ field }) => (
                              <ReactQuill
                                {...field}
                                theme="snow"
                                className="border-2 rounded-lg"
                                modules={QUILL_MODULE}
                                formats={QUILL_FORMAT}
                                placeholder="Tulis keluhan disini..."
                                onChange={onChangeComplaintValue}
                                defaultValue={queue?.description}
                              />
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-end w-full gap-3 mt-5 md:flex-row">
                    <button
                      type="button"
                      className="px-20 py-3 text-base font-medium leading-4 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
                      onClick={() => navigate("/admin/outpatient/appointments")}
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
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default UpdateQueueAction;
