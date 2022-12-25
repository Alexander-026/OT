import axios from "axios";
import { IAuthResponse } from "../models/AuthResponse";

export const API_URL = "http://localhost:5000/api";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  if (config.headers)
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});


$api.interceptors.response.use((config) => {
  return config
}, async (error )=> {
  const originalRequest = error.config
  if(error.response.status === 401 && error.config && !error.config._isRetry) {
    try {
      const  response = await axios.get<IAuthResponse>(`${API_URL}/refresh`, {withCredentials:true})
      localStorage.setItem('user', JSON.stringify(response))
      return $api.request(originalRequest)
    } catch (error) {
      console.log('Not auth')
    }
   
   }
})


export default $api