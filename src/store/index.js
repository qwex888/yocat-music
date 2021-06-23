import Vue from "vue";
import Vuex from "vuex";
import { playlistDetail } from "@/apis/songOrder";
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
      playList: []
    },
    currentSong:
      !!localStorage.getItem("currentSong") &&
      localStorage.getItem("currentSong") != undefined
        ? JSON.parse(localStorage.getItem("currentSong"))
        : {
            id: "",
            isLocal: false,
            name: "",
            picUrl: "",
            singer: [],
            url: "",
            time: 0
          },
    currentPlaylistIndex: 0,
    playStatus: false, // false暂停
    volume: !!localStorage.getItem("volume")
      ? Number(localStorage.getItem("volume"))
      : 50
  },
  actions: {
    // 切换歌曲
    changeSong({ commit }, direction) {
      console.log(direction);
    },
    // 获取歌单详情
    getOrdelDetail({ commit, dispatch }, id) {
      playlistDetail(id)
        .then(res => {
          const { code, playlist } = res;
          if (code === 200) {
            const playList = playlist.tracks.map(s => {
              return {
                id: s.id,
                name: s.name,
                picUrl: s.al.picUrl,
                singer: s.ar,
                time: s.dt
              };
            });
            Vue.prototype.$ipc.send("electron-store-set", {
              key: "playList",
              value: playList
            });
            commit("setElectronStore", { playList });
            commit("setCurrentPlaylistIndex", 0);
            // 取出里面歌曲的id和赋值当前音乐信息到组件，并记录当前播放下标
            commit("setCurrentSong", {
              value: playList[0],
              isEmpty: true
            });
          }
        })
        .catch(err => {});
    }
  },
  mutations: {
    setCurrentSong(state, { value, isEmpty }) {
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
