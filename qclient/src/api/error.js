import { Message } from "view-design";
export default (err) => {
  const dataAxios = err.response;
  if(!dataAxios) {
    Message.error(err.message);
    return Promise.reject(err.message);
  }
  const { status } = dataAxios;
  let message = "服务错误！";
  switch (status) {
    case 404:
      message = dataAxios.statusText;
      break;
    case 500:
      message = dataAxios.statusText;
      break;
    default:
       break 
  }
  Message.error(message);
  return Promise.reject(err);
};
