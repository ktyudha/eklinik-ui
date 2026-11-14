import config from "@/constant/config";
import axios, { CreateAxiosDefaults } from "axios";
import Cookies from "js-cookie";

type AxiosInstanceParams = {
  withToken: boolean;
  tokenType?: "admin" | "patient";
};

const mapToken = new Map([
  ["admin", "token"],
  ["patient", "token-patient"],
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
  instance.interceptors.request.use((cfg) => {
    window.dispatchEvent(new CustomEvent("api:start"));
    return cfg;
  });
  instance.interceptors.response.use(
    (resp) => {
      window.dispatchEvent(new CustomEvent("api:end"));
      return resp;
    },
    (err) => {
      window.dispatchEvent(new CustomEvent("api:end"));
      if (err.response.status === 401 && token && param.tokenType) {
        Cookies.remove(mapToken.get(param.tokenType) as string);
      }
      return Promise.reject(err.response);
    }
  );

  return instance;
}
