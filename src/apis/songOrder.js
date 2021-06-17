import axios from "@/common/axios";

// 获取精品歌单
export const highquality = ({ cat, limit, before }) => {
  return axios.post("/login/cellphone", { cat, limit, before });
};
