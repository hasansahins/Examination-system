import { createRouter, createWebHistory } from "vue-router";
import { mapGetters } from "vuex";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: () => import("../views/HomeView.vue"),
      meta: {
        auth: true,
      },
    },

    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      meta: {
        auth: false,
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
      meta: {
        auth: false,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const cookie = localStorage.getItem("espnl");
  if (to.meta.auth) {
    if (cookie) {
      next();
    } else {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath,
        },
      });
    }
  }
  next();
});

export default router;
