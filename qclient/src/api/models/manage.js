import request from "../index";
export default {
  updateCode() {
    let param = {
      url: `/manage/updategulist`,
    };
    return request(param);
  },
  getUpdateTime() {
    let param = {
      url: `/manage/getUpdate`,
    };
    return request(param);
  },
  setBgMusic(val){
    let param = {
      url: `/manage/bgmusic?state=${val}`,
    };
    return request(param);
  }
};
