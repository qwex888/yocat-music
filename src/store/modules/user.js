import Vue from "vue";
import { phoneLogin } from "@/apis/user";
import Message from "ant-design-vue/lib/message";
const state = {
  userToken: "",
  userAccount: {},
  userProfile: {},
};
const mutations = {
  setUserInfo(state, data) {
    state.userToken = data.token;
    state.userAccount = data.account;
    state.userProfile = data.profile;
  },
};
const actions = {
  async login({ commit }, userParams) {
    console.log(userParams, "userParams");
    if (userParams.type === 1) {
      const res = await phoneLogin(userParams.phone, userParams.password);
      const { code, account, bindings, cookie, profile, token } = res;
      if (code === 200) {
        commit("setUserInfo", { account, profile, token });
        return true;
      } else {
        Message.error(res.msg || res.message);
        return false;
      }
    }
  },
};

export default { state, mutations, actions };
