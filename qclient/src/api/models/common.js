import request from "../index";
export default {
  regist(opiton) {
    let param = {
      url: "/regist",
      method: "post",
      data: {
        name: opiton.name,
        password: opiton.password,
        phone: opiton.phone,
      },
    };
    return request(param);
  },
  login(opiton) {
    let param = {
      url: "/login",
      method: "post",
      data: {
        name: opiton.name,
        password: opiton.password,
      },
    };
    return request(param);
  },
  logout() {
    let param = {
      url: "/logout",
    };
    return request(param);
  }
};
