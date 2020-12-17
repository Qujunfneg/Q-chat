import VueRouter from "vue-router";
import guard from './guard'
import Login from "../views/login.vue";
import Home from "../views/home.vue";
const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  {
    path: "/", 
    redirect:'/home' 
  }
];
const router = new VueRouter({ routes });
guard(router)

export default router;
