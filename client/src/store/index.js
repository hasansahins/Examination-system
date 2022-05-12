import { createStore } from "vuex";
import { Login } from "./Accounts.js";
// Create a new store instance.

const store = createStore({
  state() {
    return {
      // User data.
      user: {
        name: "",
        email: "",
        password: "",
        isLogin: false,
        token: "",
        message: "",
        remember: false,
      },
      pages: [],
    };
  },
  getters: {
    User(state) {
      return state.user;
    },
  },
  actions: {
    updateIsLogin: ({ commit }, [email, password]) => {
      commit("setIsLogin", [email, password]);
    },
  },
  mutations: {
    setIsLogin: (state, [email, password]) => {
      Login(email,password).then((res) => {});
      console.log("email", email, "password", password);
      // Api call to login.
      if (email === "mert@test.com" && password === "123456") {
        state.user.isLogin = true;
        state.user.token = "123456";
        state.user.message = "";
      } else {
        state.user.isLogin = false;
        state.user.token = "";
        state.user.message = "Email or password is incorrect.";
      }
    },
  },
});

export default store;
