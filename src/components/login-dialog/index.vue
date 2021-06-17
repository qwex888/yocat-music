<template>
  <a-modal
    dialogClass="login-dialog"
    :visible="visible"
    :footer="null"
    :maskClosable="false"
    @cancel="cancelDiolog"
  >
    <h3 class="page-tit">{{ pageTit }}</h3>
    <div v-if="formData.type === 1" class="form">
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

      <a-button style="margin-top: 10px" type="link" @click="changLogin(2)">
        切换其他方式登录>>
      </a-button>

      <a-checkbox class="agree-service" @change="onChangeService">
        同意
        <a-button style="padding: 0" type="link" @click="goService">
          《隐私条款》以及《用户协议》
        </a-button>
      </a-checkbox>
    </div>
    <div v-else class="qrcode">
      <div class="qrimg">
        <img :src="qrimg" />
        <div v-if="qroverdue" class="qrmock">
          <a-button type="link">
            <a-icon type="reload" />
            <br />
            二维码已失效<br />点击重新生成
          </a-button>
        </div>
      </div>
      <a-button type="link" @click="changLogin(1)"> 切换至密码登录>> </a-button>
    </div>
  </a-modal>
</template>

<script>
import { isMobile } from "@/utils/validate";
export default {
  name: "login-dialog",
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        phone: "",
        password: "",
        type: 1
      },
      loginLoading: false,
      autoLogin: false,
      serviceLogin: false,
      qrimg: null,
      qroverdue: false // false 不显示过期蒙层
    };
  },
  computed: {
    pageTit() {
      return this.formData.type === 1 ? "手机登录" : "扫码登录";
    }
  },
  methods: {
    cancelDiolog() {
      this.autoLogin = false;
      this.loginLoading = false;
      this.formData = {
        phone: "",
        password: "",
        type: 1
      };
      // 通知关闭
      this.$emit("close");
    },
    changLogin(type) {
      this.formData.type = type;
      if (type === 2 && !this.qroverdue) {
        // 请求二维码
      }
    },
    async submitLogin() {
      if (!this.serviceLogin)
        return this.$message.warning("请先同易并阅读服务条款！");
      if (!this.formData.phone) return this.$message.warning("请输入手机号");
      if (!this.formData.password) return this.$message.warning("请输入密码");
      if (!isMobile(this.formData.phone))
        return this.$message.warning("手机格式不正确");
      this.loginLoading = true;
      const successLogin = await this.login({
        ...this.formData,
        password: this.$md5(this.formData.password)
      });
      successLogin ? this.cancelDiolog() : (this.loginLoading = false);
    },
    // 自动登录
    onChangeAutoLogin(e) {
      this.autoLogin = e.target.checked;
    },
    // 阅读协议
    onChangeService(e) {
      this.serviceLogin = e.target.checked;
    },
    goService() {}
  }
};
</script>

<style lang="less" scoped>
/deep/.login-dialog {
  width: 435px !important;
  height: 430px;
  .ant-modal-body,
  .ant-modal-content {
    height: 100%;
  }
  .page-tit {
    padding: 20px auto;
    text-align: center;
    font-size: 29px;
    letter-spacing: 2px;
  }
  .form {
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;

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
  .qrcode {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 25px;
    .qrimg {
      display: block;
      width: 180px;
      height: 180px;
      margin-bottom: 32px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .qrmock {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.2);
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      button {
        margin-top: 40px;
        line-height: 28px;
      }
    }
  }
}
</style>
