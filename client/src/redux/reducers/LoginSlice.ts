import { CaseReducer, createSlice,  PayloadAction } from "@reduxjs/toolkit";
import { checkAuth } from "./LoginActions";
import { IAuthResponse } from "../../models/AuthResponse";
import { AnyAsyncThunk, RejectedWithValueActionFromAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import { IUser } from "../../models/User";



interface ILoginPage {
   user: IUser | null,
   loading: boolean;
   error: string | null;
   isAuthenticated: boolean;
   
}


const initialState:ILoginPage = {
   user: null,
   loading: false,
   error: null,
   isAuthenticated: false,
}


const setUser:CaseReducer<ILoginPage, PayloadAction<IAuthResponse>> = (state, action) => {
   localStorage.setItem('user', JSON.stringify(action.payload))
   state.user = action.payload.user
}

export const loginSlice = createSlice({
   name: 'login-page',
   initialState,
   reducers: {
      setUser
   },
   extraReducers: builder => {
      builder.addCase(checkAuth.pending, (state) => {
         state.loading = true
         state.error = null
      })
      builder.addCase(checkAuth.fulfilled, (state, action:PayloadAction<IAuthResponse | undefined>) => {
         if(action.payload?.user.isActivated) {
            localStorage.setItem('user', JSON.stringify(action.payload))
            state.user = action.payload.user
         }
         state.loading = false
      })
      builder.addCase(checkAuth.rejected, (state, action:PayloadAction<RejectedWithValueActionFromAsyncThunk<AnyAsyncThunk>>) => {
         state.error = action.payload
         state.loading = false
      })
   }
})


export default loginSlice.reducer
