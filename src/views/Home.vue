<template>
  <div class="home">
    hello
    <a-button type="primary" @click="changeTheme('#992777')">
      Primary
    </a-button>
  </div>
</template>

<script>
export default {
  name: "home",
  methods: {
    changeTheme(primaryColor) {
      this.$u.updateTheme(primaryColor);
    },
  },
};
</script>

<style lang="less" scoped>
#home {
  width: 300px;
  height: 300px;
  background: rgb(153, 153, 153);
}
</style>
