import { isMobile } from "./validate";
export const validatePhone = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入手机号"));
  } else if (!isMobile(value)) {
    callback(new Error("手机格式不正确"));
  } else {
    callback();
  }
};
