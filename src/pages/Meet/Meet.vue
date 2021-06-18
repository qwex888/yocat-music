<template>
  <div class="meet">
    <div v-for="(item, index, key) in lsitMap" :key="key" class="song-group">
      <template v-if="!pageLoading">
        <span class="title" @click="goMore(item)"
          >{{ item.title }} <a-icon type="right"
        /></span>
        <div class="song-list">
          <div v-for="(ite, sub) in item.list" :key="sub" class="song-item">
            <div class="song-cover">
              <y-image
                class="image"
                :src="ite.picUrl"
                @click="getDetail(ite)"
              ></y-image>
              <span class="play-count"
                ><i class="iconfont icon-bofang"></i>
                {{ setPlaybackAmount(ite.playCount) }}</span
              >
              <div class="play"><a-icon type="play-circle" /></div>
            </div>
            <span class="song-title" @click="getDetail(ite)">{{
              ite.name
            }}</span>
          </div>
        </div>
      </template>
      <a-skeleton :loading="pageLoading" active></a-skeleton>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
import { personalized, highquality } from "@/apis/songOrder";
import { setPlaybackAmount } from "@/utils/util";
import YImage from "@/components/y-image/";
export default {
  name: "Meet",
  components: { YImage },
  data() {
    return {
      pageLoading: true,
      lsitMap: {
        personalized: {
          title: "推荐歌单",
          list: [],
        },
        highquality: {
          title: "精品歌单",
          list: [],
        },
      },
    };
  },
  computed: {
    ...mapState("user", ["userToken", "userProfile"]),
  },
  created() {
    this.getData();
  },
  mounted() {},
  methods: {
    ...mapActions("user", ["login"]),
    setPlaybackAmount,
    async getData() {
      this.pageLoading = true;
      await this.getPersonalized();
      await this.getHighquality();
      this.pageLoading = false;
    },
    async getHighquality() {
      const res = await highquality();
      const { code, playlists } = res;
      if (code === 200) {
        this.lsitMap.highquality.list = playlists.map((item) => {
          return { ...item, picUrl: item.coverImgUrl + "?param=200y200" };
        });
      }
      return res;
    },
    async getPersonalized() {
      const res = await personalized();
      const { code, result } = res;
      if (code === 200) {
        this.lsitMap.personalized.list = result.map((item) => {
          return { ...item, picUrl: item.picUrl + "?param=200y200" };
        });
      }
      return res;
    },
    goMore(item) {
      console.log(item);
    },
    getDetail(item) {
      console.log(item.id);
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
