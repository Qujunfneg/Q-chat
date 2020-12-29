function guard(router) {
  router.beforeEach((to, from, next) => {
    let isLogin = sessionStorage.getItem('loginFlag')
    if (to.name !== "login" && isLogin!=='true') next('/login')
    // if(to.name==='login' && isLogin==='true') next(false)
    else next()
  });
}
export default guard;
