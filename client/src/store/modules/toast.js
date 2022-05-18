import { createStore } from "vuex";
import { Login, Register, IsLogin } from "../../api/Accounts";
import router from "../../router";

export default {
  state: {
    toasts: [],
  },
  mutations: {
    addToast(state, toast) {
      state.toasts.push(toast);
    },
    clearToast(state, title) {
      const index = state.toasts.findIndex((toast) => toast.title === title); // find toast
      state.toasts.splice(index, 1); // remove toast from array
    },
  },
  actions: {},
  modules: {},
};


// this.$store.commit("addToast", {
//   title: "Hello Vuex!",
//   type: "success",
//   message: "It looks like you have successfully set up Vuex.",
// });
