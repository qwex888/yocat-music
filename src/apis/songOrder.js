import axios from "@/common/axios";

// 获取歌单详情
export const playlistDetail = (id) => {
  return axios.get(`/playlist/detail?id=${id}`);
};

// 获取精品歌单
export const highquality = ({ cat, limit, before }) => {
  return axios.post("/top/playlist/highquality", { cat, limit, before });
};

// 推荐歌单
export const personalized = (limit) => {
  return axios.get(`/personalized${limit ? "?limit=" + limit : ""}`);
};
