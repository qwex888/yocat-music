import Vue from "vue";
import { phoneLogin, logout } from "@/apis/user";
import Message from "ant-design-vue/lib/message";
const state = {
  userToken: "",
  userAccount: {},
  userProfile: {},
  userCookie: ""
};
const mutations = {
  setUserInfo(state, data) {
    state.userToken = data.token;
    state.userAccount = data.account;
    state.userProfile = data.profile;
    state.userCookie = data.cookie;
  }
};
const actions = {
  async login({ commit }, userParams) {
    if (userParams.type === 1) {
      const res = await phoneLogin(userParams.phone, userParams.password);
      const { code, account, bindings, cookie, profile, token } = res;
      if (code === 200) {
        commit("setUserInfo", { account, profile, token, cookie });
        return true;
      } else {
        Message.error(res.msg || res.message);
        return false;
      }
    }
  },
  async logOut() {
    const res = await logout();
    if (res.code === 200) {
      commit("setUserInfo", { account: {}, profile: {}, token: "" });
    }
  }
};

export default { state, mutations, actions };
