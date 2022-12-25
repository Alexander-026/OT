
// import { IUser } from '../../models/User';
import $api, { API_URL } from "../http";
import axios, {AxiosResponse} from 'axios'
import { IAuthResponse } from "../../models/AuthResponse";


export default class AuthService {
   static async login(user:{email:string,password:string}):Promise<AxiosResponse<IAuthResponse>> {
      return $api.post<IAuthResponse>('/login', user)
   }
   static async registration(user:{email:string,password:string}):Promise<AxiosResponse<IAuthResponse>> {
      return $api.post<IAuthResponse>('/registration', user)
   }
   static async logout():Promise<void> {
      return $api.post('/logout')
   }

   static async checkAuth() {
      try {
         const response = await axios.get<IAuthResponse>(`${API_URL}/refresh`, {withCredentials:true})
         return response
      } catch (error) {
         
      }
   }
}




