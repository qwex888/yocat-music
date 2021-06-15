<template>
  <a-modal
    dialogClass="login-dialog"
    :visible="visible"
    :footer="null"
    @cancel="cancelDiolog"
  >
    <p>请确认最小化面板或退出</p>
    <div class="radio">
      <a-radio-group v-model="value">
        <a-radio style="display: block" :value="'close'">
          退出程序
        </a-radio>
        <a-radio style="display: block" :value="'reside'">
          最小化到托盘
        </a-radio>
      </a-radio-group>
    </div>

    <div class="footer">
      <a-checkbox v-model="remember">
        记住我的选择
      </a-checkbox>
      <div>
        <a-button class="btn primary" type="primary" @click="submit"
          >确定</a-button
        >
        <a-button class="btn" @click="cancelDiolog">取消</a-button>
      </div>
    </div>
  </a-modal>
</template>

<script>
export default {
  name: "close-dialog",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      value: 2,
      remember: false,
    };
  },
  methods: {
    cancelDiolog() {
      // 通知关闭
      this.$emit("close");
    },
    submit() {
      setStore("userConfig.closeConfirm.remember", this.remember);
      setStore("userConfig.closeConfirm.value", this.value);
      console.log(this.remember, this.value);
      let ipcRenderer = window.electron.ipcRenderer;
      ipcRenderer.send("control", value);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.ant-modal-body {
  padding: 35px;
}
.radio {
  margin-left: 25px;
}
.footer {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .btn {
    min-width: 94px;
  }
  .primary {
    margin-right: 35px;
  }
}
</style>
