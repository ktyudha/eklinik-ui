import { FunctionComponent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formattedDateTime2 } from "@/helpers/date";
import clsx from "clsx";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Textarea from "@/components/reusable/Form/Textarea";
import Spinner from "@/components/reusable/Spinner";
import useCreateQueue from "@/services/patient/queue/hooks/useCreateQueue";
import QueueSkeleton from "./QueueSkeleton";
import useGetActiveQueue from "@/services/patient/queue/hooks/useGetActiveQueue";
import axiosInstance from "@/lib/axios-instance";
// import { UilRefresh } from "@iconscout/react-unicons";

interface QueuePayload {
  description: string;
}

type FormFields = QueuePayload;

const LandingQueue: FunctionComponent = () => {
  const { queue_number_now, queue, loading } = useGetActiveQueue();
  const [queueData, setQueueData] = useState<any | null>(queue);
  const [loadingCancel, setLoadingCancel] = useState(false);
  const { createQueue } = useCreateQueue();

  const methods = useForm<FormFields>({ mode: "onChange" });
  const { isSubmitting } = methods.formState;
  const isValid = methods.formState.isValid;

  const onSubmit: SubmitHandler<FormFields> = async (state) => {
    const { error, response } = await createQueue(state.description);
    if (error || response) {
      if (error) {
        toast.error("Gagal Menambahkan Pasien", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.success("Sukses Menambahkan Pasien", {
          position: toast.POSITION.TOP_CENTER,
        });
        methods.reset();
      }
    }
  };

  const cancelQueue = async () => {
    setLoadingCancel(true);
    try {
      const { data, status } = await axiosInstance({
        withToken: true,
        tokenType: "patient",
      }).post(`/patient/appointments/cancel/${queueData?.id}`);
      if (data && status === 200) {
        toast.success("Berhasil Membatalkan Antrian", {
          position: toast.POSITION.TOP_CENTER,
        });
        setQueueData(null);
      }
    } catch (error: any) {
      toast.error("Gagal Membatalkan Antrian", {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setLoadingCancel(false);
    }
  };

  useEffect(() => {
    setQueueData(queue);
  }, [queue]);

  return (
    <>
      <section className="md:mx-auto bg-white max-w-md">
        <div className="mx-4 md:px-4 pt-4">
          {loading ? (
            <QueueSkeleton />
          ) : (
            <>
              <div className="relative text-center bg-[#4bb43a] text-white py-8 mb-4 rounded-xl before:content-[''] after:content-[''] before:w-6 before:h-6 after:w-6 after:h-6 before:bg-white after:bg-white before:rounded-full after:rounded-full before:absolute after:absolute before:top-1/2 after:top-1/2 before:-left-3 after:-right-3 before:-translate-y-1/2 after:-translate-y-1/2">
                <h5 className="uppercase text-sm">Nomor Antrian Saat Ini</h5>
                {/* <div className="relative flex items-center justify-center w-full">
                   
                    <button className="absolute left-24 bg-[#e4f8e0] shadow text-white p-1.5 rounded-full my-auto">
                      <UilRefresh size="20" color="#6eca5e" />
                    </button> */}

                <span className="text-4xl font-semibold tracking-wider text-center">
                  {queue_number_now || "0"}
                </span>
                {/* </div> */}
              </div>

              {queueData ? (
                <div className="relative text-center bg-gray-100 py-8 rounded-xl before:content-[''] after:content-[''] before:w-6 before:h-6 after:w-6 after:h-6 before:bg-white after:bg-white before:rounded-full after:rounded-full before:absolute after:absolute before:bottom-[22.5%] after:bottom-[22.5%] before:-left-3 after:-right-3 before:-translate-y-[20%] after:-translate-y-[20%]">
                  <div className="mb-4">
                    <label className="uppercase text-sm text-[#4bb43a]">
                      Pasien
                    </label>
                    <h5 className="uppercase text-lg font-semibold">
                      {queueData?.patient.name}
                    </h5>
                    <span className="text-sm font-medium tracking-wider">
                      {formattedDateTime2(queueData?.queue_date)}
                    </span>
                  </div>

                  <div className="mb-4">
                    <label className="uppercase text-sm text-[#4bb43a]">
                      Keluhan
                    </label>
                    <h5 className="capitalize text-lg font-semibold">
                      {queueData?.description}
                    </h5>
                  </div>

                  <div className="mb-8">
                    <label className="uppercase text-sm text-[#4bb43a]">
                      Nomor Antrian
                    </label>
                    <p className="text-6xl font-bold tracking-wider">
                      {queueData?.queue_number}
                    </p>
                  </div>

                  <div className="mx-8 flex">
                    <button
                      type="button"
                      className="bg-red-500 text-white w-full py-3 rounded-lg text-base"
                      onClick={cancelQueue}
                      disabled={loadingCancel}
                    >
                      <span>{loadingCancel ? <Spinner /> : "Batalkan"}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-6">
                  <FormProvider {...methods}>
                    <form
                      className="w-full"
                      onSubmit={methods.handleSubmit(onSubmit)}
                    >
                      <Textarea
                        label="Keluhan"
                        placeholder="Tulis keluhan Anda secara singkat"
                        name="description"
                        isRequired
                      />

                      <button
                        type="submit"
                        className={clsx([
                          "block w-full py-4 mt-4 rounded-lg font-semibold mb-2 cursor-pointer",
                          isValid
                            ? "bg-[#1c2674] hover:bg-[#1c2674] text-white"
                            : "bg-neutral-200 text-neutral-400",
                        ])}
                        disabled={isSubmitting || !isValid}
                      >
                        <span>
                          {isSubmitting ? <Spinner /> : "Ambil Antrian"}
                        </span>
                      </button>
                    </form>
                  </FormProvider>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default LandingQueue;
