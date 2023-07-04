import axios from "./axios";

    // account ifo: https://goose-track-api-3uhn.onrender.com/api/user/current
    // logout:      https://goose-track-api-3uhn.onrender.com/api/user/logout
    // login:       https://goose-track-api-3uhn.onrender.com/api/auth/login

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

 saveAccountInfoAPI: async (data) => {
  const response = await axios.patch(`/api/user/info`, data);

  return response.data;
},

// api for get calendar events
getCalendarEventsAPI: async (year, month) => {
  const response = await axios.get(`/api/tasks?month=${month}&year=${year}`);

  return response.data;
},

// api for add calendar events
addTasksEventsAPI: async (data) => {
  const response = await axios.post(`/api/tasks`, data);

  return response.data;
},

// api to delete calendar events
deleteTasksEventsAPI: async (eventId) => {
  const response = await axios.delete(`/api/tasks/${eventId}`);

  return response.data;
},

};

export default accountAPI;