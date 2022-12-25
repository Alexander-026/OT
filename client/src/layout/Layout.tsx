import React, {  useCallback, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../api/services/AuthServiceRTK";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { IAuthResponse } from "../models/AuthResponse";
import { checkAuth } from "../redux/reducers/LoginActions";
import styles from "./Layout.module.scss";

let render = 0;
const Layout = () => {
   const [logout] =  useLogoutMutation()
  const [userStorage, setUserStorage] = useLocalStorage<IAuthResponse | null>(
    "user",
    null
  );
  const { loading, user } = useAppSelector((state) => state.loginReducer);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const refresh = useCallback(async () => {
    await dispatch(checkAuth())
      .then((data: any) => {
        if (!data.payload.user.isActivated) {
          return navigate("/activate", { replace: true });
        }
      })
      .catch((error) => {
        return navigate("/login", { replace: true });
      });
  }, [dispatch, navigate]);

  useEffect(() => {
    if (userStorage) {
      refresh();
    }
  }, [refresh, userStorage]);

  if (!userStorage) {
    return <Navigate to="/login" replace />;
  }



  const logoutHandler = async():Promise<void> => {
      setUserStorage(null)
      await logout()
  }

  return (
    <div className={styles.layout}>
      {loading && <h1>Loading</h1>}
      {!loading && user?.isActivated && (
        <>
          <header>
            <h5>Render: {render++}</h5>

            <button onClick={logoutHandler}>Logout</button>
          </header>
          <section>
            <Outlet />
          </section>
          <footer>
            <h5>Footer</h5>
          </footer>
        </>
      )}
    </div>
  );
};

export default Layout;
