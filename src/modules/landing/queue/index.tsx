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
    <section className="mx-auto min-h-[80vh] max-w-md px-4 py-8">
      {loading ? (
        <QueueSkeleton />
      ) : (
        <>
          <div className="rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-sky-500 p-8 text-center text-white shadow-lift">
            <p className="text-xs font-medium uppercase tracking-wider text-white/80">Nomor antrian saat ini</p>
            <p className="mt-2 text-6xl font-bold tracking-wider">{queue_number_now || "0"}</p>
          </div>

          {queueData ? (
            <div className="surface mt-4 p-6 text-center">
              <p className="text-xs uppercase tracking-wider text-gray-400">Nomor antrian Anda</p>
              <p className="mt-1 text-6xl font-bold tracking-wider text-brand-600">{queueData?.queue_number}</p>
              <dl className="mt-6 space-y-3 border-t border-gray-100 pt-5 text-left text-sm">
                <div className="flex justify-between gap-4"><dt className="text-gray-400">Pasien</dt><dd className="font-medium text-gray-800">{queueData?.patient.name}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-gray-400">Waktu</dt><dd className="font-medium text-gray-800">{formattedDateTime2(queueData?.queue_date)}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-gray-400">Keluhan</dt><dd className="text-right font-medium text-gray-800">{queueData?.description}</dd></div>
              </dl>
              <button type="button" className="btn btn-outline mt-6 w-full border-error-500 text-error-600 hover:bg-error-50" onClick={cancelQueue} disabled={loadingCancel}>
                {loadingCancel ? <Spinner /> : "Batalkan antrian"}
              </button>
            </div>
          ) : (
            <div className="surface mt-4 p-6">
              <h2 className="text-lg font-bold text-gray-900">Ambil antrian</h2>
              <p className="mb-4 text-sm text-gray-500">Ceritakan keluhan Anda secara singkat.</p>
              <FormProvider {...methods}>
                <form className="w-full" onSubmit={methods.handleSubmit(onSubmit)}>
                  <Textarea label="Keluhan" placeholder="Mis. Kontrol kehamilan" name="description" isRequired />
                  <button type="submit" className={clsx("btn btn-primary mt-4 h-12 w-full text-base", !isValid && "opacity-60")} disabled={isSubmitting || !isValid}>
                    {isSubmitting ? <Spinner /> : "Ambil antrian"}
                  </button>
                </form>
              </FormProvider>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default LandingQueue;
