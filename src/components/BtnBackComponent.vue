<template>
  <div>
    <button class="mr-4" :style="{ width: width }" color="primary" small elevation="0" @click="goBack">Back</button>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: "auto",
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
