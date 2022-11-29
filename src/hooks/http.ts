import { useState, useCallback, useContext } from "react";
import AuthApi from "../constants/api/main/auth.api";
import MainApi from "../constants/api/main/main.api";
import IAuthResponse from "../models/users/auth/IAuthResponse";
import { authSlice } from "../store/reducers/AuthSlice";
import { useAppSelector } from "./redux";


const useHttp = (baseUrl: string = MainApi.MAIN_SERVER) => {
    const auth = useAppSelector(state => state.authReducer);
    const authActions = authSlice.actions;

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const originalRequest = useCallback(async (url: string, method = 'GET', body: BodyInit | null = null, headers: Headers | undefined) => {
        setLoading(true);

        try {
            const response = await fetch(
                (baseUrl + url), 
                { 
                    method, 
                    body, 
                    headers 
                }
            );

            const data = await response.json();
            setLoading(false);

            return {
                response,
                data
            };
        } catch(e){
            setLoading(false);
            setError((e as Error).message);

            // for tests
            console.log(e);
        }

        return {
            response: null,
            data: null
        };
    }, []);

    const refreshToken = useCallback(async (token: string | null | undefined, typeAuth: string | null | undefined) => {
        setLoading(true);

        try {
            const response = await fetch(
                (baseUrl + AuthApi.REFRESH),
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        refresh_token: token,
                        type_auth: typeAuth
                    })
                }
            );

            const data: IAuthResponse = await response.json();

            if(response.ok){
                authActions.setAuthData({
                    users_id: data.users_id,
                    type_auth: data.type_auth,
                    access_token: data.access_token,
                    refresh_token: data.refresh_token,
                    attributes: data.attributes,
                    modules: data.modules
                });
            }

            setLoading(false);

            return data;
        } catch(e){
            setLoading(false);
            setError((e as Error).message);
            throw e;
        }
    }, []);

    const request = useCallback(async (url: string, method = 'GET', body: BodyInit | null = null, headers: Headers | undefined, multipart: boolean | undefined = false) => {
        setLoading(true);
        try {
            if((body) && (!headers?.get('Content-Type')) && (!multipart)){
                body = JSON.stringify(body);
                headers?.set('Content-Type', 'application/json');
            }

            if((auth.access_token) && (auth.type_auth)){
                headers?.set('Authorization', `Bearer ${auth.type_auth} ${auth.access_token}`);
            }

            let {response, data} = await originalRequest(url, method, body, headers);

            // Status Code 401 - Unauthorized
            if(response?.status === 401){
                const request = await refreshToken(auth.refresh_token, auth.type_auth);
                headers?.set('Authorization', `Bearer ${request.type_auth} ${request.access_token}`);

                const updateResponse = await originalRequest(url, method, body, headers);

                response = updateResponse.response;
                data = updateResponse.data;
            }

            setLoading(false);

            return data;
        } catch(e){
            setLoading(false);
            setError((e as Error).message);
            throw e;
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return { loading, request, error, clearError };
};

export default useHttp;