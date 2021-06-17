<template>
  <div class="meet">
    <div v-for="(item, index, key) in lsitMap" :key="key" class="song-group">
      <span class="title">{{ item.title }} <a-icon type="right"/></span>
      <div class="song-list">
        <div v-for="(ite, sub) in item.list" :key="sub" class="song-item">
          <div class="song-cover">
            <img :src="ite.picUrl" alt="" @click="getDetail(ite)" />
            <span
              ><i class="iconfont icon-bofang"></i>
              {{ setPlaybackAmount(ite.playCount) }}</span
            >
          </div>
          <span class="song-title" @click="getDetail(ite)">{{ ite.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
import { personalized } from "@/apis/songOrder";
import { setPlaybackAmount } from "@/utils/util";
export default {
  name: "Meet",
  components: {},
  data() {
    return {
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
    this.getPersonalized();
  },
  mounted() {},
  methods: {
    ...mapActions("user", ["login"]),
    setPlaybackAmount,
    async getPersonalized() {
      const res = await personalized();
      const { code, result } = res;
      if (code === 200) {
        this.lsitMap.personalized.list = result.map((item) => {
          console.log(setPlaybackAmount(item.playCount), item.playCount);
          return { ...item, picUrl: item.picUrl + "?param=200y200" };
        });
      }
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
