<template>
  <!-- :src="src" -->
  <img
    v-if="!isErr"
    v-lazy="src"
    :alt="alt"
    @error="error"
    @click="$emit('click')"
  />
  <div v-else class="placeholder"><a-icon type="picture" /></div>
</template>
<script>
export default {
  name: "YImage",
  props: {
    src: {
      type: String,
      default: ""
    },
    alt: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isErr: false
    };
  },
  methods: {
    error() {
      this.isErr = true;
    }
  }
};
</script>
<style lang="less" scoped>
img {
  width: inherit;
  height: inherit;
  // -webkit-user-drag: none;
}
.placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  color: #cecaca;
  border: 1px solid @normal-color;
}
</style>
