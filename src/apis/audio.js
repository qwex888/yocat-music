import axios from "@/common/axios";

// 获取音乐 url
export const getSongUrl = (id) => {
  return axios.get(`/song/url?id=${id}`);
};
