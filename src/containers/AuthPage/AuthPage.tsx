import { FC, useState } from "react";
import AuthApi from "../../constants/api/main/auth.api";
import useHttp from "../../hooks/http";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { authSlice } from "../../store/reducers/AuthSlice";
import styles from './AuthPage.module.css';
import logo_netman from '../../resources/images/main/image_netman.png';
import { authSignIn } from "../../store/actions/AuthActions";
import IAuthRequest from "../../models/users/auth/IAuthRequest";

const AuthPage: FC<any> = () => {
  const auth = useAppSelector((state) => state.authReducer);
  const authActions = authSlice.actions;
  const dispatch = useAppDispatch();
  
  // const message = useMessage();
  const { loading, request, error, clearError } = useHttp();

  const [form, setForm] = useState<IAuthRequest>({
    email: "",
    password: "",
  });

  /*useEffect(() => {
    message(error, "error");
    clearError();
  }, [error, message, clearError]);*/

  const changeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.currentTarget.name]: event.currentTarget.value });
  };

  const loginHandler = () => {
    dispatch(authSignIn(form));
  };

  /*
   * Пример работы перенаправления с одной страницы на другую
   */
  /*const toRegPage = () => {
        window.location.assign(default_config.serverAddress + "/register");
    };*/

  return (
    <div className={styles["container-login"]}>
      <div className={styles["content"]}>
        <div className={styles["item-login-1"]}>
          <img className={styles["auth-logo-img"]} src={logo_netman} />
          <span className={styles["auth-logo-text"]}>NetMan AR Game</span>
        </div>

        <div className={styles["item-login-2"]}>
          <span className={styles["auth-txt"]}>Авторизация</span>

          <div className={styles["btn-mail-pswrd"]}>
            Email
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Введите email"
              className={styles["login-input-field"]}
              onChange={changeHandler}
            />
          </div>
          <div className={styles["btn-mail-pswrd"]}>
            Password
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Введите пароль"
              className={styles["login-input-field"]}
              onChange={changeHandler}
            />
          </div>
          <div className={styles["restore-password"]}>
            <a className={styles["restore-ref"]} href="">
              Забыл пароль
            </a>
          </div>

          <button
            className={styles["btn-auth-std"]}
            onClick={loginHandler}
            disabled={loading}
          >
            <span>Войти</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
