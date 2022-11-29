export const AuthApiMain = "/auth/management";

const AuthApi = {
    LOGIN: `${AuthApiMain}/login`,
    OAUTH: `${AuthApiMain}/oauth`,
    LOGOUT: `${AuthApiMain}/logout`,
    REFRESH: '/auth/refresh/token',
}

export default AuthApi;
