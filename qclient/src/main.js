import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import router from "./router/route";
import './assets/style/base.scss'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(ViewUI);
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
