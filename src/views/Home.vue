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
            <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
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
        <a-divider type="vertical" />
        <div class="control">
          <a-icon type="minus" @click="ipcSend('minimize')" />
          <a-icon
            :type="isMaximize ? 'fullscreen-exit' : 'fullscreen'"
            @click="ipcSend('maximize'), (isMaximize = !isMaximize)"
          />
          <a-icon type="close" @click="ipcSend('close')" />
        </div>
      </div>
    </div>
    <a-modal
      dialogClass="login-dialog"
      :visible="visibleLogin"
      :footer="null"
      @cancel="cancelDiolog"
    >
      <div v-if="formData.type === 1" class="form">
        <h3 class="page-tit">{{ pageTit }}</h3>
        <a-input
          class="inp"
          v-model="formData.phone"
          placeholder="请输入手机号"
        />
        <a-input-password
          v-model="formData.password"
          class="inp"
          placeholder="请输入密码"
        />
        <a-checkbox style="margin-left: 87px" @change="onChangeAutoLogin">
          自动登录
        </a-checkbox>
        <a-button
          class="btn"
          type="primary"
          :loading="loginLoading"
          @click="submitLogin"
          >登录</a-button
        >

        <a-button type="link" @click="changLogin">
          换其他方式登录>>
        </a-button>

        <a-checkbox class="agree-service" @change="onChangeService">
          同意
          <a-button style="padding:0" type="link" @click="goService">
            《隐私条款》以及《用户协议》
          </a-button>
        </a-checkbox>
      </div>
      <!-- <a-form-model
        ref="ruleForm"
        :model="formData"
        :rules="rules"
        v-bind="formItemLayout"
      >
        <a-form-model-item ref="phone" label="手机号" prop="phone">
          <a-input v-model="formData.phone" />
        </a-form-model-item>
        <a-form-model-item ref="password" label="密码" prop="password">
          <a-input
            v-model="formData.password"
            type="password"
            autocomplete="off"
          />
        </a-form-model-item>
      </a-form-model> -->
    </a-modal>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
import YAvatar from "@/components/y-avatar";
import { isMobile } from "@/utils/validate";
export default {
  name: "home",
  components: {
    YAvatar,
  },
  data() {
    return {
      visibleLogin: false,
      loginLoading: false,
      autoLogin: false,
      serviceLogin: false,
      isMaximize: false,
      formData: {
        phone: "",
        password: "",
        type: 1,
      },
      electron: null,
      // formItemLayout: { labelCol: { span: 4 }, wrapperCol: { span: 14 } },
      // rules: {
      //   phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
      //   password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      // },
    };
  },
  computed: {
    ...mapState("user", ["userToken", "userProfile"]),
    pageTit() {
      return this.formData.type === 1 ? "手机登录" : "扫码登录";
    },
  },
  mounted() {
    this.electron = window.electron;
    console.log(window.electron, "this.electron");
  },
  methods: {
    ...mapActions("user", ["login"]),
    changeTheme(primaryColor) {
      this.$u.updateTheme(primaryColor);
    },
    onChangeAutoLogin(e) {
      this.autoLogin = e.target.checked;
    },
    onChangeService(e) {
      this.serviceLogin = e.target.checked;
    },
    goLogin() {
      this.visibleLogin = true;
    },
    goService() {},
    cancelDiolog() {
      this.visibleLogin = false;
      this.autoLogin = false;
      this.loginLoading = false;
      this.formData = {
        phone: "",
        password: "",
        type: 1,
      };
    },
    changLogin() {
      this.formData.type = 2;
    },
    onSearch(value) {
      console.log(value, "search");
    },
    async submitLogin() {
      if (!this.serviceLogin)
        return this.$message.warning("请先同易并阅读服务条款！");
      if (!this.formData.phone) return this.$message.warning("请输入手机号");
      if (!this.formData.password) return this.$message.warning("请输入密码");
      if (!isMobile(this.formData.phone))
        return this.$message.warning("手机格式不正确");
      this.loginLoading = true;
      await this.login(this.formData);
      this.cancelDiolog();
    },
    ipcSend(type) {
      const ipcRenderer = window.electron.ipcRenderer;
      ipcRenderer.send("control", type);
    },
    minimize() {
      this.electron.hide();
    },
    fullscreen() {
      if (win.isMaximized()) {
        this.isMaximize = false;
        this.electron.unmaximize();
      } else {
        this.isMaximize = true;
        this.electron.maximize();
      }
    },
    closeMain() {
      this.electron.close();
    },
    logOut() {},
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
