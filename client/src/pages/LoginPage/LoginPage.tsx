import React, { memo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useRegistrationMutation, useLoginMutation } from '../../api/services/AuthServiceRTK';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { IAuthResponse } from '../../models/AuthResponse';
import styles from './LoginPage.module.scss'


let render = 0

const LoginPage = () => {
   const [user, setUser] = useLocalStorage<IAuthResponse | null>("user", null)
   const [registrationUser, {error:errorRegistration,isLoading:loadingRegistration,data:dataRegistration, }] = useRegistrationMutation()
   const [loginUser, {error:errorLogin, isLoading:loadingLogin, data: dataLogin}] = useLoginMutation()
   const [email, setEmail] = useState<string>('')
   const [password, setPass] = useState<string>('')
   if(user?.user?.isActivated) {
      return  <Navigate to="/"  replace />;
   }
   if(user &&  !user.user.isActivated) {
      console.log('vmksmvkmsamvksa')
      return  <Navigate to="/activate"  replace />;
   }
   const registrationHandler = async ():Promise<void> => {
      await registrationUser({email,password})
   }
   const loginHandler = async ():Promise<void> => {
      await loginUser({email,password})
   }
   const loading = loadingRegistration || loadingLogin
   const error = errorRegistration || errorLogin
   const data = dataRegistration || dataLogin
   if(data) {
      console.log('datata', data)
      setUser(data)
   }
   console.log('error', error)
   return (
      <div className={styles.loginPage}>
         {loading && <h5>Loading...</h5>}
         <h6>Render:{render++}</h6>
         <div>
            <input style={{width: '30rem'}} value={email} onChange={(e) => setEmail(e.target.value)} type="text"  placeholder='email' />
         </div>
         <div>
            <input style={{width: '30rem'}} type="password" value={password} onChange={(e) => setPass(e.target.value)}  placeholder='password' />
         </div>
         {/* <div>
            <button>Login</button>
         </div> */}
         <div>
            <button onClick={loginHandler}>Login</button>
            <button onClick={registrationHandler}>Registration</button>
         </div>
      </div>
   );
};

export default memo(LoginPage);