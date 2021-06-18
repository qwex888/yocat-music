<template>
  <div class="footer">
    <div class="song-info">
      <div class="song-cover">
        <img src="@/assets/images/logo.png" />
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
      <!-- 音量调节 -->
      <div class="volume">
        <i class="iconfont icon-yinliang"></i>
      </div>
      <!-- 播放列表 -->
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
    };
  },
  computed: {
    ...mapState(["currentSong", "playList", "playStatus"]),
  },
  methods: {
    durationTrans,
    ...mapActions(["changeSong"]),
    ...mapMutations(["setPlayStatus"]),
    // 滚动条切换
    progressChange(value) {
      console.log(value);
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
