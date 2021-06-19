<template>
  <div class="footer">
    <div class="song-info">
      <div :class="['song-cover', songCoverAnimate]" @click="openSongDetail">
        <!-- <img src="@/assets/images/logo.png" /> -->
      </div>
      <div class="song-msg">
        <a-tooltip>
          <template slot="title">
            prompt text
          </template>
          <span class="song-title">ALKSjdl asjdoiqe sdjkwej</span>
        </a-tooltip>
        <a-tooltip>
          <template slot="title">
            prompt text
          </template>
          <span class="song-singer">aosdja-dqwdojeeqpwoje</span>
        </a-tooltip>
      </div>
    </div>
    <div class="song-control">
      <div class="song-btn">
        <i class="iconfont icon-shangyishouge" @click="changeSong('prev')"></i>
        <i
          :class="[
            'iconfont player',
            playStatus ? 'icon-zanting' : 'icon-bofang',
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
        <span class="time">{{ durationTrans(songEndTime) }}</span>
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
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
import { durationTrans } from "@/utils/util";
export default {
  name: "SongBar",
  props: {},
  data() {
    return {
      songStartTime: 0,
      songEndTime: 0,
      isMute: false,
      initVolume: 50,
      songCoverAnimate: "shadow-drop-2-lr",
    };
  },
  computed: {
    ...mapState(["volume", "currentSong", "electronStore", "playStatus"]),
    volumeIcon() {
      return this.volume === 0
        ? "icon-guanbishengyin"
        : this.volume === 100
        ? "icon-zuidayinliang"
        : "icon-yinliang";
    },
  },
  created() {
    this.initVolume = this.volume;
  },
  methods: {
    durationTrans,
    ...mapActions(["changeSong"]),
    ...mapMutations(["setPlayStatus", "setVolume"]),
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
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
