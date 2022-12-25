import { createAsyncThunk } from "@reduxjs/toolkit";
import { AnyAsyncThunk, RejectedWithValueActionFromAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import AuthService from "../../api/services/AuthSercive";
import { IAuthResponse } from "../../models/AuthResponse";


export type LoginBody = {
   email: string,
   password: string
}


export const checkAuth = createAsyncThunk(
   'checkAuth',
   async (_,thunkAPI):Promise<IAuthResponse | RejectedWithValueActionFromAsyncThunk<AnyAsyncThunk> | undefined>  => {
      try {
         const loginResponse = await AuthService.checkAuth();
         return loginResponse?.data
      } catch (error) {
         console.log('eroor', error)
         return  thunkAPI.rejectWithValue('Falsches Passwort oder E-Mail')
      }
   }
)