import request from "../index";
export default {
  getlist(opiton) {
    let param = {
      url: `gu/lists/${opiton.userid}`,
    };
    return request(param);
  },
  // form表单的数据项
  getGuInfo() {
    let param = {
      url: `gu/getGuInfo`,
    };
    return request(param);
  },
  guAdd(opiton) {
    let param = {
      url: `gu/add`,
      method:'post',
      data:opiton
    };
    return request(param);
  },
};
