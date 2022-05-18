<script>
import { RouterView } from "vue-router";
import { mapGetters, mapActions } from "vuex";

import Sidebar from "./components/Sidebar.vue";
import Navbar from "./components/Navbar.vue";
import Toast from "./components/Toasts.vue";

export default {
  computed: {
    ...mapGetters(["User"]),
  },
  mounted() {
    this.isLogin();
  },
  methods: {
    isLogin() {
      this.$store.dispatch("IsLogin");
    },
  },
  components: {
    Sidebar,
    Navbar,
    Toast,
  },
};
</script>

<template>
  <div class="container">
    <div v-if="User.isLogin">
      <Sidebar />
      <!-- <Navbar /> -->
    </div>
    <Toast />
    <RouterView> </RouterView>
  </div>
</template>



