import axios from "./axios";

    // account ifo: https://goose-track-api-3uhn.onrender.com/api/user/current
    // logout:      https://goose-track-api-3uhn.onrender.com/api/user/logout
    // login:       https://goose-track-api-3uhn.onrender.com/api/auth/login



console.log('11111111111111111111111111111')

const accountAPI = {
 // api for logIn, return user data and token we need
 loginAPI: async (data) => {
  console.log(data);
    const response = await axios.post(`/api/auth/login`, data); // REST_API_URL + /api/auth/login
    console.log(response);

    return response.data;
 },

  // api for signUp(registrationn), return user data and token we need
 registeredAPI: async (data) => {
  console.log(data);
  const response = await axios.post(`/api/auth/register`, data); // REST_API_URL + /api/auth/register
  console.log(response);

  return response.data;
 },

  // api for getting user account data, return user data and token we need
 getAccountInfoAPI: async () => {
   const response = await axios.get(`/api/user/current`);

   return response.data;
 },

 // api for save user account data, return user data and token we need
 getChangeAccountInfoAPI: async () => {
  const response = await axios.patch(`/api/user/info`);

  return response.data;
}
};

export default accountAPI;