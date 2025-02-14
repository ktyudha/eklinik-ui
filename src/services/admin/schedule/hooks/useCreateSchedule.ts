import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";
import { ICreateOrUpdateSchedulePayload } from "../interfaces/create-or-update-schedule.types";

export default function useCreateSchedule() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const createSchedule = async (
    payload: ICreateOrUpdateSchedulePayload
  ) => {
    const { day,start_time, end_time, specific_date, information, is_active } = payload;

    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "admin",
      }).post("/admin/schedules", {
        day,start_time, end_time, specific_date, information, is_active
      });

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/admin\/schedules/);
      }

      return { response: res, error: null };
    } catch (error: any) {
      if (error.status >= 500) {
        return { response: null, error: "Server error" };
      }

      return { response: null, error: error.data.message };
    }
  };

  return { createSchedule };
}
