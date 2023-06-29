import axiosLib from "axios";
import { REST_API_URL } from "./constants";
import { useNavigate } from "react-router-dom";

import {
  notification,
} from "antd";

const axios = axiosLib.create({
  baseURL: REST_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// перехопиваємо запити Інтерсептором и додаем токен
axios.interceptors.request.use(
  config => {
    // вытягнули з локал сторейджа строку с токеном и юзером
    const stringFromLocalstorage = localStorage.getItem("auth");

    let tokenStr = "";
    if (stringFromLocalstorage) {                       // преревіряем строку с локалсторейджа на null и undefinded
      const object = JSON.parse(stringFromLocalstorage);// парсім строку в объект
      tokenStr = object.token;                          // сетаем в змінну Токен
    }

    config.headers['Authorization'] = `Bearer ${tokenStr}`;  // сетаем токен в хедер кожного запиту

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// обрабатывает відповідь від сервера
axios.interceptors.response.use(
(response) => {
  return response;
}, 
(error) => {
  notification.error({
    message: (error.response?.data?.message)
  });

  if (error.response.status === 401) {
    localStorage.clear();   // отчищаем токен из локалсторейджа(бо отримали 401)
    window.location.pathname = '/login';
  }

  if (error.response && error.response.data) {
    return Promise.reject(error.response.data);
  }
  return Promise.reject(error.message);
});

export default axios;