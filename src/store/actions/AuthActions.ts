import { AppDispatch } from "../store";
import axios from "axios";
import { authSlice } from "../reducers/AuthSlice";
import IAuthResponse from "../../models/users/auth/IAuthResponse";
import MainApi from "../../constants/api/main/main.api";
import AuthApi from "../../constants/api/main/auth.api";
import useHttp from "../../hooks/http";
import messageQueueAction from "./MessageQueueAction";
import { empty } from "src/types/empty";
import { IResponseMessage } from "src/models/message/IResponseMessage";

export const authSignIn = (data: any) => async(dispatch: AppDispatch) => {
    try{
        dispatch(authSlice.actions.signIn());
        const response = await axios.post<IAuthResponse>(MainApi.MAIN_SERVER + AuthApi.LOGIN, data);

        if ((response.status != 200) && (response.status != 201)) {
            dispatch(messageQueueAction.addMessage(response as unknown as IResponseMessage, "error", response.statusText));
            return;
        }
        
        dispatch(authSlice.actions.signInSuccess(response.data));
    }catch(e){
        dispatch(messageQueueAction.errorMessage(e as Error));
    }
};
