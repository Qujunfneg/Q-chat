import VueRouter from "vue-router";
import guard from './guard'
import Login from "../views/login.vue";
import Home from "../views/home.vue";
import Gulists from '../views/home/gulists.vue'
import GuForm from '../views/home/guform.vue'
import userManage from '../views/admin/userManage.vue'
import featureManage from '../views/admin/featureManage.vue'
import Chart from '../views/chat/chat.vue'
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
    children:[{
      path:'/',
      name:'gulists',
      component:Gulists
    },{
      path:'/add',
      name:'guadd',
      component:GuForm
    },{
      path:'/userManage',
      name:'userManage',
      component:userManage
    },
    {
      path:'/featureManage',
      name:'featureManage',
      component:featureManage
    },{
      path:'/chart',
      name:'chart',
      component:Chart
    }]
  },
  {
    path: "/", 
    redirect:'/home' 
  },
  {
    path:'*',
    redirect:'/home' 
  }
];
const router = new VueRouter({ routes });
guard(router)

export default router;
