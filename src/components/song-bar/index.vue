<template>
  <div class="footer">
    <div class="song-info">
      <div :class="['song-cover', songCoverAnimate]" @click="openSongDetail">
        <img
          :src="currentSong && currentSong.picUrl ? currentSong.picUrl : ''"
        />
      </div>
      <div class="song-msg">
        <a-tooltip>
          <template slot="title">
            {{ currentSong && currentSong.name ? currentSong.name : "" }}
          </template>
          <span class="song-title">{{
            currentSong && currentSong.name ? currentSong.name : ""
          }}</span>
        </a-tooltip>
        <a-tooltip>
          <template slot="title">
            {{ currentSong | returnSinger }}
          </template>
          <span class="song-singer">{{ currentSong | returnSinger }}</span>
        </a-tooltip>
      </div>
    </div>
    <div class="song-control">
      <div class="song-btn">
        <i class="iconfont icon-shangyishouge" @click="changeSong('prev')"></i>
        <i
          :class="[
            'iconfont player',
            playStatus ? 'icon-zanting' : 'icon-bofang'
          ]"
          @click="setPlayStatus()"
        ></i>
        <i class="iconfont icon-xiayishou" @click="changeSong('next')"></i>
      </div>
      <div class="song-progress">
        <span class="time">{{ durationTrans(songStartTime) }}</span>
        <a-slider
          :default-value="0"
          :tooltipVisible="false"
          @change="progressChange"
        />
        <span class="time">{{
          durationTrans(currentSong && currentSong.time ? currentSong.time : 0)
        }}</span>
      </div>
    </div>
    <div class="song-set">
      <!-- 播放方式 -->
      <i class="iconfont icon-xunhuanbofang"></i>
      <!-- 音量调节 -->
      <div class="volume">
        <i :class="['iconfont', volumeIcon]" @click="handleVolume"></i>
        <a-slider
          v-model="initVolume"
          :default-value="volume"
          @change="volumeChange"
        />
      </div>
      <!-- 播放列表 -->
      <i class="iconfont icon-gedan"></i>
    </div>
    <!-- 音乐标签 -->
    <audio
      ref="audioRef"
      :src="currentSong && currentSong.url ? currentSong.url : ''"
    ></audio>
  </div>
</template>

<script>
import { getSongUrl } from "@/apis/audio";
import { mapMutations, mapState, mapActions } from "vuex";
import { durationTrans } from "@/utils/util";
import { returnSinger } from "@/utils/filter";
export default {
  name: "SongBar",
  props: {},
  data() {
    return {
      songStartTime: 0,
      songEndTime: 0,
      isMute: false,
      initVolume: 50,
      songCoverAnimate: "shadow-drop-2-lr"
    };
  },
  computed: {
    ...mapState([
      "volume",
      "electronStore",
      "playStatus",
      "currentPlaylistIndex"
    ]),
    currentSong() {
      return this.$store.state.currentSong;
    },
    playList() {
      console.log(this.electronStore.playList, "computed:playList");
      return this.electronStore.playList;
    },
    volumeIcon() {
      return this.volume === 0
        ? "icon-guanbishengyin"
        : this.volume === 100
        ? "icon-zuidayinliang"
        : "icon-yinliang";
    }
  },
  watch: {
    "currentSong.id": {
      immediate: false,
      handler: function(newval) {
        console.log(newval, "watch,当前播放id");
        if (newval) this.getSongUrl(newval);
      }
    }
  },
  created() {
    this.initVolume = this.volume;
  },
  methods: {
    durationTrans,
    ...mapActions(["changeSong"]),
    ...mapMutations([
      "setPlayStatus",
      "setCurrentPlaylistIndex",
      "setVolume",
      "setCurrentSong"
    ]),
    // 滚动条切换
    progressChange(value) {
      console.log(value);
    },
    volumeChange(value) {
      this.setVolume(value);
      this.initVolume = value;
    },
    handleVolume() {
      if (this.isMute) {
        this.setVolume(50);
        this.initVolume = 50;
      } else {
        this.setVolume(0);
        this.initVolume = 0;
      }
      this.isMute = !this.isMute;
    },
    openSongDetail() {
      this.songCoverAnimate = "";
      setTimeout(() => {
        this.songCoverAnimate = "shadow-drop-2-lr";
      }, 200);
    },
    getSongUrl(id) {
      // 在此可能需要判断是否为本地路径
      getSongUrl(id)
        .then(res => {
          const { code, data } = res;
          if (code === 200 && data[0].code === 200) {
            this.setCurrentSong({
              value: { url: data[0].url, isLocal: false },
              isEmpty: false
            });
          } else {
            Message.error(
              [404, 403].includes(data.code)
                ? "找不到该歌曲或未登录"
                : "获取异常"
            );
          }
        })
        .catch(err => {});
    }
  },
  filters: {
    returnSinger
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
