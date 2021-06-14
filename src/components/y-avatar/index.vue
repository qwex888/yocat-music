<template>
  <a-avatar size="small" icon="user" :src="src" />
</template>

<script>
export default {
  name: "y-avatar",
  props: {
    src: {
      type: String,
      default: "",
    },
  },
};
</script>

<style></style>
