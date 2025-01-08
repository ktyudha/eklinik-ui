import axiosInstance from "@/lib/axios-instance";
import useRevalidateMutation from "@/lib/swr/useRevalidateMutation";

export default function useDeleteSubMenu() {
  const revalidateMutationsByKey = useRevalidateMutation();

  const deleteSubMenu = async (subMenuId: string) => {
    try {
      const res = await axiosInstance({
        withToken: true,
        tokenType: "admin",
      }).delete(`/admin/sub-menu/${subMenuId}`);

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

  return { deleteSubMenu };
}
