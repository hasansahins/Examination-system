import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "dashboard",
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/DashboardView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/kullanicilar",
      name: "kullanicilar",
      component: () => import("../views/UserView.vue"),
    },
    {
      path: "/kullanicilar/:id",
      name: "kullanici",
      component: () => import("../views/UserDetailView.vue"),
    },
    {
      path: "/roller",
      name: "roller",
      component: () => import("../views/RolesView.vue"),
    },

    {
      path: "/roller/:id",
      name: "rol",
      component: () => import("../views/RoleDetailView.vue"),
    },
    {
      path: "/profil",
      name: "profil",
      component: () => import("../views/ProfileView.vue"),
    },
    {
      path: "/sorular",
      name: "sorular",
      component: () => import("../views/SorularView.vue"),
    },
    {
      path: "/sorular/:id",
      name: "soru",
      component: () => import("../views/SoruView.vue"),
    },
    {
      path: "/kategoriler",
      name: "kategoriler",
      component: () => import("../views/KategorilerView.vue"),
    },
    {
      path: "/kategoriler/:id",
      name: "kategori",
      component: () => import("../views/KategoriView.vue"),
    },
    {
      path: "/sinav",
      name: "sinav",
      component: () => import("../views/SinavView.vue"),
    },
  ],
});

router.beforeEach(async (to, from) => {
  const user = JSON.parse(localStorage.getItem("User"));
  if (!user && to.name !== "login" && to.name !== "register") {
    // redirect the user to the login page
    return { name: "login" };
  }
});

export default router;

// router.beforeEach((to, from, next) => {
//   const user = JSON.parse(localStorage.getItem("User"));
//   // Auth check
//   if (to.meta.auth) {
//     // If user is not logged in
//     if (user) {
//       next({
//         path: "/",
//       });
//     }
//     // push
//     else {
//       next({
//         path: "/login",
//         query: {
//           redirect: to.fullPath,
//         },
//       });
//     }
//   }
// });
