import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const files = require.context("./modules", false, /\.js$/);
const modules = {};

files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, "")] = files(key).default;
});
Object.keys(modules).forEach(key => {
  modules[key]["namespaced"] = true;
});
const store = new Vuex.Store({
  modules,
  state: {
    globalMsgShow: false,
    globalMsg: {
      type: "",
      msg: ""
    },
    electronStore: {
      playlist: {}
    },
    currentSong:
      localStorage.getItem("currentSong") &&
      localStorage.getItem("currentSong") != undefined
        ? JSON.parse(localStorage.getItem("currentSong"))
        : {},
    currentPlaylistIndex: 0,
    playStatus: false, // false暂停
    volume: localStorage.getItem("volume")
      ? Number(localStorage.getItem("volume"))
      : 50
  },
  actions: {
    changeSong({ commit }, direction) {
      console.log(direction);
    }
  },
  mutations: {
    setCurrentSong(state, { value, isEmpty }) {
      console.log(value, isEmpty, "setCurrentSong");
      if (value) {
        if (!isEmpty) {
          state.currentSong = { ...state.currentSong, ...value };
        } else {
          state.currentSong = value;
        }
        localStorage.setItem("currentSong", JSON.stringify(state.currentSong));
      }
    },
    setVolume(state, value) {
      state.volume = value;
      localStorage.setItem("volume", value);
    },
    setPlayStatus(state) {
      state.playStatus = !state.playStatus;
    },
    setCurrentPlaylistIndex(state, index) {
      state.currentPlaylistIndex = index;
    },
    setElectronStore(state, data) {
      state.electronStore = { ...state.electronStore, ...data };
      console.log(state.electronStore, "state.electronStore");
    },
    setGlobalMsgShow(state, data) {
      state.globalMsgShow = data;
    },
    setGlobalMsg(state, data) {
      state.globalMsg = data;
    }
  }
});
export default store;
