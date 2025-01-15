import { BASE_API_URL } from "@/constant/config";

export function formattedFile(param: string) {
  const replacedBaseUrl = BASE_API_URL.replace("/api/v1", "");
  return param.replace(`${replacedBaseUrl}/`, `${replacedBaseUrl}/storage/`);
}
