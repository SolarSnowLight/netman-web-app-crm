import React, { useEffect } from "react";
import "./App.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { authSlice } from "../../store/reducers/AuthSlice";
import { authSignIn } from "../../store/actions/AuthActions";
import IModules from "../../models/users/IModules";
import IAuthResponse from "../../models/users/auth/IAuthResponse";
import IAttributes from "../../models/users/IAttributes";
import { configSlice } from "../../store/reducers/ConfigSlice";
import AuthPage from "../AuthPage";
import { BrowserRouter } from "react-router-dom";
import useRoutes from "../../routes/routes";
import { ToastContainer } from "react-toastify";

function App() {
  const config = useAppSelector(state => state.configReducer);
  const auth = useAppSelector(state => state.authReducer);
  
  const isAuthenticated = !!auth.access_token;
  // @ts-ignore
  const routes = useRoutes(isAuthenticated, auth.modules);

  return (
    <BrowserRouter>
      {routes}
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
}

export default App;

/*const {count} = useAppSelector(state => state.userReducer);
  const {increment} = userSlice.actions;
  const dispatch = useAppDispatch();*/

/*const dispatch = useAppDispatch();
  const {users} = useAppSelector(state => state.userReducer);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);*/
