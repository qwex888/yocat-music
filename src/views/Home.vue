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
  name: "home",
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
      ipcRenderer: null
    };
  },
  computed: {
    ...mapState("user", ["userToken", "userProfile"])
  },
  mounted() {
    this.ipcRenderer = window.electron.ipcRenderer;
    this.ipcRenderer.on("close-onfirm", function(event, arg) {
      console.log(arg); // prints "pong"
      if (arg === "open") {
        console.log("打开弹窗");
        this.visibleClose = true;
      } else {
        this.ipcRenderer.send("control", arg);
      }
    });
  },
  methods: {
    ...mapActions("user", ["login"]),
    changeTheme(primaryColor) {
      this.$u.updateTheme(primaryColor);
    },
    onSearch(value) {
      console.log(value, "search");
    },
    ipcSend(type) {
      this.ipcRenderer.send("control", type);
    },
    closeMain() {
      // 向主进程发出询问,通过通信返回是否打开弹窗
      this.ipcRenderer.send("control", "isRemember");
    },
    goLogin() {
      this.visibleLogin = true;
    },
    logOut() {}
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
