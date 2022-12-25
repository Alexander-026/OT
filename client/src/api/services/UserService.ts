import $api from "../http";
import {AxiosResponse} from 'axios'

import { IUser } from "../../models/User";


export default class UserService {
   static getAll():Promise<AxiosResponse<IUser[]>> {
      return $api.get<IUser[]>('/users')
   }
}