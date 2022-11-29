/* Библиотеки */
import { v4 as uuidv4 } from "uuid";
import { AxiosError } from "axios";

/* Контекст */
import { messageQueueSlice } from "../reducers/MessageQueueSlice";
import { AppDispatch } from "../store";

/* Типы */
import { empty } from "src/types/empty";

/* Модели */
import { IMessage } from "src/models/message/IMessage";
import { IResponseMessage } from "src/models/message/IResponseMessage";

const addMessage =
  (
    response: IResponseMessage | empty,
    type: string | empty,
    message: string | empty
  ) =>
  async (dispatch: AppDispatch) => {
    if (response || message) {
      const msg: IMessage = {
        uuid: uuidv4(),
        data: {
          message: message ? message : response?.message,
        },
        status: response ? response.status : 200,
        type: type,
        created_at: new Date(),
      };

      dispatch(messageQueueSlice.actions.addMessage(msg));
    }
  };

const removeMessage = (uuid: string | empty) => async (dispatch: AppDispatch) => {
  dispatch(messageQueueSlice.actions.removeMessage(uuid as string));
};

const errorMessage = (e: Error) => async (dispatch: AppDispatch) => {
  if (e instanceof AxiosError) {
    const msg: IMessage = {
      uuid: uuidv4(),
      data: {
        message: e.response?.data.message,
      },
      status: e.response ? e.response.status : 200,
      type: "error",
      created_at: new Date(),
    };

    dispatch(messageQueueSlice.actions.addMessage(msg));
  } else {
    const msg: IMessage = {
      uuid: uuidv4(),
      data: {
        message: e.message,
      },
      status: 400,
      type: "error",
      created_at: new Date(),
    };

    dispatch(messageQueueSlice.actions.addMessage(msg));
  }
};

const messageQueueAction = {
  removeMessage,
  addMessage,
  errorMessage,
};

export default messageQueueAction;
