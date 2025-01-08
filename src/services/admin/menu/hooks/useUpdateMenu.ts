import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";
import { ICreateOrUpdateMenuPayload } from "../interfaces/create-or-update-menu.types";

export default function useUpdateMenu(menuId: string) {
  const revalidateMutationsByKey = useRevalidateMutation();

  const updateMenu = async (payload: ICreateOrUpdateMenuPayload) => {
    const { name, is_active } = payload;

    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "admin",
      }).post(`/admin/menu/${menuId}`, {
        name,
        is_active,
        _method: "PUT",
      });

      if (res.status === 200) {
        revalidateMutationsByKey(/^\/admin\/menu/);
      }

      return { response: res, error: null };
    } catch (error: any) {
      if (error.status >= 500) {
        return { response: null, error: "Server error" };
      }

      return { response: null, error: error.data.message };
    }
  };

  return { updateMenu };
}
