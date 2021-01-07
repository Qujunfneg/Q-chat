import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import router from "./router/route";
import "./assets/style/base.scss";
import ViewUI from "view-design";
import controller from "./controller";
import "view-design/dist/styles/iview.css";
import store from "./store";
import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client"
const files = require.context("./api/models", false, /\.js$/);
let modle = {};
files.keys().forEach((item) => {
  modle = { ...modle, ...files(item).default };
});
let apis = {};
Object.entries(modle).forEach((item) => {
  apis[item[0]] = item[1];
});
Vue.prototype.api = apis;
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(ViewUI);
Vue.prototype.$eventBus = new Vue();
Vue.firstPage = true;
Vue.prototype.$controller = controller;

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: SocketIO("localhost:3000"),
  })
);
Vue.directive('loading',{
  bind:function(el,binding,vnode,oldVnode){
    var html = document.createElement('div')
    html.className='spin'
    html.style.cssText="position:absolute;top:0;bottom:0;left:0;right:0;background:#fff;opacity:0.9;z-index:100"
    var img = document.createElement('img')
    var src=require('./assets/ico/spin.gif')
    img.src=src
    img.style.cssText="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:60px"
    html.appendChild(img)
    el.insertBefore(html,el.children[0])
    if(!binding.value){
      html.style.display='none'
    }
  },
  update:function(el,binding,vnode,oldVnode){
    [...el.children].find(item=>item.className='spin').style.display=binding.value?'block':'none'
  }
})
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
