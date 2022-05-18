import { createStore } from "vuex";
import accounts from "./modules/accounts";
import toast from "./modules/toast";

const store = createStore({
  modules: {
    accounts,
    toast
  },
});



export default store;