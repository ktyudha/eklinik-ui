import config from "@/constant/config";
import axios, { CreateAxiosDefaults } from "axios";
import Cookies from "js-cookie";

type AxiosInstanceParams = {
  withToken: boolean;
  tokenType?: "admin" | "agency" | "sub-agency" | "school" | "student";
};

const mapToken = new Map([
  ["admin", "token"],
  ["agency", "token-agency"],
  ["sub-agency", "token-sub-agency"],
  ["school", "token-school"],
  ["student", "token-student"],
]);

export default function axiosInstance(
  param: AxiosInstanceParams,
  instanceSettings?: CreateAxiosDefaults
) {
  const token = param.tokenType
    ? Cookies.get(mapToken.get(param.tokenType) as string)
    : null;

  const instance = axios.create({
    baseURL: config.BASE_API_URL,
    headers: param.withToken
      ? {
          Authorization: `Bearer ${token}`,
        }
      : undefined,
    ...instanceSettings,
  });
  instance.interceptors.response.use(
    (resp) => resp,
    (err) => {
      if (err.response.status === 401 && token && param.tokenType) {
        Cookies.remove(mapToken.get(param.tokenType) as string);
      }
      return Promise.reject(err.response);
    }
  );

  return instance;
}
