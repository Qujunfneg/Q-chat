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
      method: "post",
      data: opiton,
    };
    return request(param);
  },
  guDel(opiton) {
    let param = {
      url: `gu/delete`,
      method: "post",
      data: opiton,
    };
    return request(param);
  },
  guInfo(code){
    let param = {
      url: `gu/guInfo/${code}`,
    };
    return request(param);
  }
};
