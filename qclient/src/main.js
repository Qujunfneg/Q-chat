import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import router from "./router/route";
import './assets/style/base.scss'
import ViewUI from 'view-design';

import 'view-design/dist/styles/iview.css';
import store from './store'
const files= require.context('./api/models',false,/\.js$/)
let modle = {}
files.keys().forEach(item=>{
    modle={...modle,...files(item).default}
})
let apis = {}
Object.entries(modle).forEach((item)=>{
  apis[item[0]]= item[1]
})
Vue.prototype.api = apis
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(ViewUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
