import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";

export default function useDeleteMenu() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const deleteMenu = async (menuId: string) => {
    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "admin",
      }).delete(`/admin/menu/${menuId}`);

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

  return { deleteMenu };
}
