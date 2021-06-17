<template>
  <div class="meet"></div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";

export default {
  name: "Meet",
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
