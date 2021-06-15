<template>
  <a-modal
    dialogClass="login-dialog"
    :visible="visible"
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
  </a-modal>
</template>

<script>
export default {
  name: "login-dialog",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formData: {
        phone: "",
        password: "",
        type: 1,
      },
      loginLoading: false,
      autoLogin: false,
      serviceLogin: false,
    };
  },
  computed: {
    pageTit() {
      return this.formData.type === 1 ? "手机登录" : "扫码登录";
    },
  },
  methods: {
    cancelDiolog() {
      this.autoLogin = false;
      this.loginLoading = false;
      this.formData = {
        phone: "",
        password: "",
        type: 1,
      };
      // 通知关闭
      this.$emit("close");
    },
    changLogin() {
      this.formData.type = 2;
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
    // 自动登录
    onChangeAutoLogin(e) {
      this.autoLogin = e.target.checked;
    },
    // 阅读协议
    onChangeService(e) {
      this.serviceLogin = e.target.checked;
    },
    goService() {},
  },
};
</script>

<style lang="less" scoped>
/deep/.login-dialog {
  width: 435px !important;
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .page-tit {
      margin: 30px auto;
      text-align: center;
      font-size: 24px;
    }
    .inp {
      margin: 0 auto;
      border-radius: 24px;
      width: 240px;
      margin-bottom: 15px;
      input {
        border-radius: 24px;
      }
    }
    .btn {
      width: 240px;
      margin: 18px auto 0;
    }
    .agree-service {
      font-size: 12px;
      margin: 20px auto;
    }
  }
}
</style>
