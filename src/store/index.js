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
    electronStore: {
      playList: [],
    },
    currentSong: {},
    playStatus: false, // false暂停
    volume: localStorage.getItem("volume")
      ? Number(localStorage.getItem("volume"))
      : 50,
  },
  actions: {
    changeSong({ commit }, direction) {
      console.log(direction);
    },
  },
  mutations: {
    setVolume(state, value) {
      state.volume = value;
      localStorage.setItem("volume", value);
    },
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
