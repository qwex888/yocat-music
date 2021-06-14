import axios from "axios";
import store from "@/store";

export const axiosCommon = axios;
export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: "https://netease-cloud-music-api-clone.vercel.app",
  timeout: 60000,
});
const cancelToken = axios.CancelToken;

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    if (config.method === "post") {
      // 如果有cache的key为true接口加上时间戳
      if (config.data.hasOwnProperty("cache") && config.data.cache === true) {
        config.url = config.url + "?timestamp=" + new Date().getTime();
      }
    }
    // const token = localStorage.getItem("token");
    // if (token) config.headers["Authorization"] = `${token}`;
    // pushRequest(config);
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    // const { code } = response.data;
    if (response.status === 200) {
      return response.data;
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
