<template>
  <div class="song"></div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
export default {
  name: "Song",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState("user", ["userToken", "userProfile"])
  },
  mounted() {},
  methods: {
    ...mapActions("user", ["login"])
  }
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
