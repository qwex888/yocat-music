<template>
  <div class="home">
    <div class="header">
      <div class="header-left">
        <div class="logo">
          <img src="@/assets/images/logo.png" alt="" />
        </div>
        <div class="search">
          <a-input-search
            size="small"
            placeholder="搜索"
            class="search-inp"
            style="width: 200px"
            @search="onSearch"
          />
        </div>
      </div>
      <div class="header-right">
        <div v-if="userToken" class="user">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              <y-avatar :src="userProfile.avatarUrl || ''"></y-avatar>
              <span class="user-name">{{ userProfile.nickname || "" }}</span>
              <a-icon type="caret-down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item key="0">
                <span @click="logOut">退出登录</span>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
        <div v-else class="user" @click="goLogin">
          <y-avatar></y-avatar>
          <span class="user-name">未登录</span>
          <a-icon type="caret-down" />
        </div>
        <a-divider type="vertical" style="margin:0 20px" />
        <div class="control">
          <a-icon type="minus" @click="ipcSend('hide')" />
          <a-icon
            :type="isMaximize ? 'fullscreen-exit' : 'fullscreen'"
            @click="ipcSend('mize'), (isMaximize = !isMaximize)"
          />
          <a-icon type="close" @click="closeMain" />
        </div>
      </div>
    </div>
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
              defaultActiveItem === ite.key ? 'active-item' : ''
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
    <!-- 登陆弹出 -->
    <login-dialog
      :visible="visibleLogin"
      @close="visibleLogin = false"
    ></login-dialog>
    <!-- 退出弹窗 -->
    <close-dialog
      :visible="visibleClose"
      @close="visibleClose = false"
    ></close-dialog>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
import { isMobile } from "@/utils/validate";
import YAvatar from "@/components/y-avatar";
import LoginDialog from "@/components/login-dialog";
import CloseDialog from "@/components/close-dialog";
export default {
  name: "Home",
  components: {
    YAvatar,
    LoginDialog,
    CloseDialog
  },
  data() {
    return {
      visibleLogin: false,
      visibleClose: false,
      isMaximize: false,
      defaultActiveItem: "meet",
      sideList: {
        default: {
          title: "",
          children: [
            {
              title: "遇见音乐",
              key: "meet",
              icon: ""
            }
          ]
        },
        user: {
          title: "我的音乐",
          children: [
            {
              title: "本地音乐",
              key: "local",
              icon: "icon-yinfu01"
            },
            {
              title: "最近播放",
              key: "recent",
              icon: "icon-suishenting"
            }
          ]
        }
      }
    };
  },
  computed: {
    ...mapState("user", ["userToken", "userProfile"])
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
    ...mapActions("user", ["login"]),
    ...mapMutations(["setElectronStore"]),
    changeTheme(primaryColor) {
      this.$u.updateTheme(primaryColor);
    },
    onSearch(value) {
      console.log(value, "search");
    },
    ipcSend(type) {
      this.$ipc.send("control", type);
    },
    closeMain() {
      // 向主进程发出询问,通过通信返回是否打开弹窗
      this.$ipc.send("control", "isRemember");
    },
    chagneItem(item) {
      this.defaultActiveItem = item.key;
      this.$router.push({ name: item.key });
    },
    goLogin() {
      this.$ipc.send("electron-store-set", {
        key: "account",
        value: { phone: 15516167302, password: "mm2395695" }
      });
      // this.visibleLogin = true;
    },
    logOut() {}
  }
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
