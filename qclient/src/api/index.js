import axios from "axios"; // 引入axios
import { Message } from "view-design";
import router from  '../router/route'
import controller from '../controller'
const files = require.context("./models", false, /\.js$/);
let modle = {};
files.keys().map((item) => {
  modle = { ...files(item).default };
});
// 环境的切换
function request(config) { 
  const inatance = axios.create({ baseURL: "http://localhost:3000" ,withCredentials:true});
  inatance.interceptors.request.use(
    function(config) {
      if (!config.method || config.method.toLowerCase() === "get")
        config.method = "get";
      if (config.method === "get") {
        if (config.data) config.params = config.data;
      }
      return config;
    },
    function() {
      
    }
  );
  inatance.interceptors.response.use(
    function(response) {
      const { data } = response;
      const { code, message } = data;
      switch (code) {
        case 500: {
          Message.error(message);
          break;
        }
        case 408:{
          Message.info(message)
          router.push('/login')
          controller.clear()
          break
        }
        default:{
            break
        }
      }
      return response;
    },
    function(err) {
      Message.error(err.message);
      Promise.reject(err.message);
    }
  );

  return new Promise((resolve, reject) => {
    inatance
      .request(config)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}
export default request;
