<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>



<script>
import Login from "./views/LoginView.vue";
import { mapGetters } from "vuex";
export default {
  name: "App",
  components: {
    RouterView,
  },
  computed: {
    ...mapGetters(["User"]),
  },
};
</script> 