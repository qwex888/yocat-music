import axios from "@/common/axios";

export const phoneLogin = (phone, password) => {
  return axios.post("/login/cellphone", { phone, password });
};
