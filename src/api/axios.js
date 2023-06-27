import axiosLib from "axios";
import { REST_API_URL } from "./constants";

import {
  notification,
 } from "antd";

const axios = axiosLib.create({
  baseURL: REST_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});


axios.interceptors.request.use(
  config => {    
    // вытянули из локал сторейджа строку с токеном и юзером
    const stringFromLocalstorage = localStorage.getItem("auth");

    let tokenStr = "";
    if (stringFromLocalstorage) {                       // проверяем строку с локалсторейджа на null и undefinded
      const object = JSON.parse(stringFromLocalstorage);// парсим строку в объект
      tokenStr = object.token;                          // сетаем в переменную Токен
    }

    console.log('===================request================');
    config.headers['Authorization'] = `Bearer ${tokenStr}`;  // сетаем токет в хедер каждого запроса

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {

  console.log(error);
  // if(error.response.status === 401) {
    notification.error({
    message: (error.response?.data?.message)
    });
  // }

  if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
  }
  return Promise.reject(error.message);
});


// if(error.response.status === 401) {
//   notification.error({
//   message: (error.response.data.message)
// });
// }


export default axios;