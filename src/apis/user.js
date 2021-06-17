import axios from "@/common/axios";

export const phoneLogin = (phone, md5_password) => {
  return axios.post("/login/cellphone", { phone, md5_password });
};

export const logout = () => {
  return axios.get("/logout");
};
