import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const files = require.context("./modules", false, /\.js$/);
const modules = {};

files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.js)/g, "")] = files(key).default;
});
Object.keys(modules).forEach((key) => {
  modules[key]["namespaced"] = true;
});
const store = new Vuex.Store({
  modules,
  state: {
    globalMsgShow: false,
    globalMsg: {
      type: "",
      msg: "",
    },
    electronStore: {},
    currentSong: {},
    playStatus: false, // false暂停
    playList: [],
  },
  actions: {
    changeSong({ commit }, direction) {
      console.log(direction);
    },
  },
  mutations: {
    setPlayStatus(state) {
      state.playStatus = !state.playStatus;
    },
    setElectronStore(state, data) {
      state.electronStore = { ...state.electronStore, ...data };
    },
    setGlobalMsgShow(state, data) {
      state.globalMsgShow = data;
    },
    setGlobalMsg(state, data) {
      state.globalMsg = data;
    },
  },
});
export default store;
