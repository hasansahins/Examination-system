<template>
  <div class="toasts-wrapper" v-if="toasts.length">
    <Toast v-for="(toast, index) of toasts" :toast="toast" :key="index">
    </Toast>
  </div>
</template>

<script>
import Toast from "./Toast.vue";

export default {
  name: "Toasts",
  components: { Toast },
  data() {
    return {
      toasts: [],
    };
  },
  created() {
    this.toasts = this.$store.state.toast.toasts;
  },
};
</script>

<style scoped>
.toasts-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 2rem;
  right: 1rem;
  z-index: 99;
}
</style>
