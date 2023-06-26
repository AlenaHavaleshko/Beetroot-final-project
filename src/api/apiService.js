import axios from "./axios";

    // account ifo: https://goose-track-api-3uhn.onrender.com/api/user/current
    // logout:      https://goose-track-api-3uhn.onrender.com/api/user/logout
    // login:       https://goose-track-api-3uhn.onrender.com/api/auth/login


// export const getProductsList = async () => {
//   const resp = await axios.get("/products");

//   return resp.data;
// }

// export const postNewProduct = async (data) => {
//   const resp = await axios.post("/products", data);

//   return resp.data;
// }


// export const getSingleProduct = async (productId) => {
//   const resp = await axios.get(`/products/${productId}`);

//   return resp.data;
// }

// =======================================================================



const accountAPI = {
 // эта апишка для логина, в ответ тоже возвращает данные юзера и НУЖНЫЙ НАМ ТОКЕН!!!
 loginCall: async (data) => {
  console.log(data);
    const response = await axios.post(`/api/auth/login`, data); // REST_API_URL + /api/auth/login
    console.log(response);

    return response.data;
 },

 registeredCall: async (data) => {
  console.log(data);
  const response = await axios.post(`/api/auth/register`, data); // REST_API_URL + /api/auth/register
  console.log(response);

  return response.data;
 },

 getAccountInfoCall: async () => {
   const resp = await axios.get(`/api/user/current`); // эта апишка для получения данных юзера

   return resp.data;
 }
};

export default accountAPI;