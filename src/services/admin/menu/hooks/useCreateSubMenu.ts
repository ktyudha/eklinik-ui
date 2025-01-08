import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";
import { ICreateOrUpdateSubMenuPayload } from "../interfaces/create-or-update-sub-menu.types";

export default function useCreateSubMenu() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const createSubMenu = async (payload: ICreateOrUpdateSubMenuPayload) => {
    const { name, is_active, type, menu_id } = payload;

    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "admin",
      }).post("/admin/sub-menu", {
        name,
        is_active,
        type,
        menu_id,
      });

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/admin\/sub-menu/);
      }

      return { response: res, error: null };
    } catch (error: any) {
      if (error.status >= 500) {
        return { response: null, error: "Server error" };
      }

      return { response: null, error: error.data.message };
    }
  };

  return { createSubMenu };
}
