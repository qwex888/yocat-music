<template>
  <div class="home">
    <y-header></y-header>
    <div class="main">
      <div class="side">
        <div
          v-for="(item, index, key) in sideList"
          :key="key"
          class="side-group"
        >
          <span :class="item.title ? 'group-tit' : ''">{{ item.title }}</span>
          <div
            v-for="(ite, sub) in item.children"
            :key="sub"
            :class="[
              'side-item',
              defaultActiveItem === ite.key ? 'active-item' : '',
            ]"
            @click="chagneItem(ite)"
          >
            <i v-if="ite.icon" :class="['iconfont', ite.icon]"></i>
            <span class="item-tit">{{ ite.title }}</span>
          </div>
        </div>
      </div>
      <div class="body">
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </div>
    </div>
    <song-bar></song-bar>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
import SongBar from "@/components/song-bar";
import YHeader from "@/components/y-header";
export default {
  name: "Home",
  components: {
    YHeader,
    SongBar,
  },
  data() {
    return {
      defaultActiveItem: "meet",
      sideList: {
        default: {
          title: "",
          children: [
            {
              title: "遇见音乐",
              key: "meet",
              icon: "",
            },
          ],
        },
        user: {
          title: "我的音乐",
          children: [
            {
              title: "本地音乐",
              key: "local",
              icon: "icon-yinfu01",
            },
            {
              title: "最近播放",
              key: "recent",
              icon: "icon-suishenting",
            },
          ],
        },
      },
    };
  },
  computed: {
    ...mapState("user", ["userToken", "userProfile"]),
  },
  mounted() {
    if (this.$ipc) {
      this.$ipc.on("close-onfirm", (event, arg) => {
        if (arg === "open") {
          this.visibleClose = true;
        } else {
          this.$ipc.send("control", arg);
          this.visibleClose = false;
        }
      });
    }
  },
  methods: {
    // 切换主题色
    changeTheme(primaryColor) {
      this.$u.updateTheme(primaryColor);
    },

    // 切换侧边栏
    chagneItem(item) {
      this.defaultActiveItem = item.key;
      this.$router.push({ name: item.key });
    },
  },
};
</script>

<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
@import "./index.less";
</style>
