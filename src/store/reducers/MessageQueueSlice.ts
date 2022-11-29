/* Libraries */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* Models */
import { IMessage } from "src/models/message/IMessage";

/* Configs */
import sliceConfig from "src/configs/slice.config.json";

/* Interface for message queue */
interface MessageQueueState {
    queue: IMessage[]
}

/* Base state for current slice */
const initialState: MessageQueueState = {
    queue: []
};

/**
 * Slice for generation and handlind queue messages
 */
export const messageQueueSlice = createSlice({
    name: sliceConfig["message-queue"],
    initialState,
    reducers: {
        addMessage(state: MessageQueueState, action: PayloadAction<IMessage>) {
            if (action.payload) {
                const prev = JSON.parse(JSON.stringify(state.queue));
                prev.push(action.payload);

                state.queue = prev;
            }
        },
        
        removeMessage(state: MessageQueueState, action: PayloadAction<string>) {
            const data = structuredClone(state.queue) as IMessage[];
            
            const index = data.findIndex((value) => {
                return value.uuid === action.payload
            });

            if (index >= 0) {
                data.splice(index, 1);
            }

            state.queue = data;
        }
    },
});

export default messageQueueSlice.reducer;