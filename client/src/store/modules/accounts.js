import { createStore } from "vuex";
import { Login, Register, IsLogin } from "../../api/Accounts";
import router from "../../router";
const userModel = {
  fullName: "",
  email: "",
  isLogin: false,
  token: "",
  message: "",
  remember: false,
  pages: [],
};
export default {
  state: {
    // User data.
    namespaced: true,
    user: {
      fullName: "",
      email: "",
      isLogin: false,
      token: "",
      message: "",
      remember: false,
      pages: [],
      _id: "",
    },
  },
  getters: {
    User(state) {
      return state.user;
    },
  },
  actions: {
    async LoginUser({ commit }, user) {
      const data = await Login(user)
        .then((res) => {
          commit("SET_USER", res.data);
        })
        .catch((err) => {
          console.log(err.response.data.message);
          commit("SET_MESSAGE", err.response.data.message);
        });
    },

    async RegisterUser({ commit }, user) {
      const data = await Register(user);
      if (data.status === 200) {
        commit("SET_USER", data.data);
      } else {
        commit("SET_MESSAGE", data.message);
      }
    },

    async LogoutUser({ commit }) {
      commit("LOGOUT");
    },

    async IsLogin({ commit }) {
      const data = await IsLogin();
      if (data.status === 200) {
        commit("SET_ISLOGIN_USER", data.data);
      }
    },
  },
  mutations: {
    async SET_USER(state, data) {
      state.user._id = data._id;

      state.user.isLogin = true;
      state.user.token = data.token;
      state.user.email = data.email;
      state.user.fullName = data.fullName;
      state.user.pages = data.pages;
      state.user.settings = data.settings;

      localStorage.setItem("User", JSON.stringify(state.user));

      router.push({ name: data.pages[0] });
    },
    async SET_ISLOGIN_USER(state, data) {
      state.user._id = data._id;
      state.user.isLogin = true;
      state.user.token = data.token;
      state.user.email = data.email;
      state.user.fullName = data.fullName;
      state.user.pages = data.pages;
      state.user.settings = data.settings;

      localStorage.setItem("User", JSON.stringify(state.user));
    },
    SET_MESSAGE(state, message) {
      state.user.message = message;
      localStorage.removeItem("User");
    },
    LOGOUT(state) {
      state.user = userModel;
      localStorage.removeItem("User");
    },
  },
};
