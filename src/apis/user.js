import axios from "@/common/axios";

// 手机登录
export const phoneLogin = (phone, md5_password) => {
  return axios.post("/login/cellphone", { phone, md5_password });
};

// 刷新登录
export const loginRefresh = () => {
  return axios.get("/login/refresh");
};

// 登出
export const logout = () => {
  return axios.get("/logout");
};

// 二维码登录-生成key
export const loginQrKey = () => {
  return axios
    .get(`/login/qr/key?timestamp=${Date.now()}`)
    .then(res => {
      if (res.code === 200) {
        return res.unikey;
      } else {
        throw false;
      }
    })
    .catch(err => {
      return "";
    });
};

// 二维码登录-生成二维码
export const loginQrCreate = key => {
  return axios.get(`/login/qr/create?timestamp=${Date.now()}&key=${key}`);
};

// 二维码登录-检测二维码状态
export const loginQrCheck = key => {
  return axios.get(`/login/qr/check?timestamp=${Date.now()}&key=${key}`);
};
