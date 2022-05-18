<template>
  <div class="sidebar">
    <div class="text-center border-b h-[51px]">
      <h3 class="p-3"><strong>Online Sınav Sistemi</strong></h3>
    </div>
    <nav>
      <ul class="mcd-menu">
        <li v-for="page in menu" v-bind:key="page.url">
          <router-link :to="'/' + page.url">
            <strong>{{ page.name }}</strong>
          </router-link>
        </li>
        <li>
          <a href="javascript:void(0);" @click="logout">
            <strong>Çıkış</strong>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import tr from "../languages/tr.json";
import { Get } from "../api";
export default {
  data() {
    return {
      menu: [],
    };
  },
  mounted() {
    this.createMenu();
  },
  methods: {
    createMenu() {
      const userPages = this.$store.getters.User.pages;
      tr.menu.forEach((page) => {
        if (userPages.includes(page.url)) {
          this.menu.push(page);
        }
      });
    },
    logout() {
      Get("accounts/logout").then((res) => {
        if (res.data === true) {
          this.$store.dispatch("LogoutUser");
          window.location.reload();
        }
      });
    },
  },
};
</script>

<style>
</style>