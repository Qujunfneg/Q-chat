export default {
  namespaced: true,
  state: () => {
    return {
      menus: [
        {
          title:'home',
          icon:'ios-home-outline',
          children:[{
            title:'list',
            name:'gulists',
            path:'/home'
          }]
        },
        {
          title:'admin',
          icon:'ios-home-outline',
          children:[{
            title:'userManage',
            name:'home',
            path:'userManage'
          },{
            title:'featureManage',
            name:'featureManage',
            path:'featureManage'
          }]
        }
      ],
    };
  },
  mutations: {},
  actions: {},
};
