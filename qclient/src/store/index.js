import Vuex from "vuex";
import Vue from 'vue'
import menu from "./menu";
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: { menu },
});
window.store = store
export default store;
