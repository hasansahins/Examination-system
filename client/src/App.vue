<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <div class="">
    <div v-if="User.isLogin">
      <h1>app</h1>
      <RouterView />
    </div>

    <div v-if="User.isLogin === false">
      <Login />
    </div>
  </div>
</template>



<script>
import Login from "./views/Login.vue";
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