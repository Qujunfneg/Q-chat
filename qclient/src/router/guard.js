import controller from '../controller'
function guard(router) {
  router.beforeEach((to, from, next) => {
    let isLogin = controller.getItem('loginFlag')
    if (to.name !== "login" && isLogin!=='true') next('/login')
    else next()
  });
}
export default guard;
