/**
 * High-Order Component для обёртки функциональных компонентов
 * с целью добавления функционала обработки сообщений любого типа
 * с использованием Redux
 * 
 * Последнее изменение: 30.11.2022
 */

/* Библиотеки */
import { FC, useEffect } from 'react';

/* Хуки */
import { useAppSelector, useAppDispatch } from 'src/hooks/redux';
import { useMessageToastify } from 'src/hooks/message.toastify.hook';
import messageQueueAction from 'src/store/actions/MessageQueueAction';
import IModules from 'src/models/users/IModules';

/**
 * 
 * @param {JSX.Element} View Функциональный компонент для отрисовки
 * @returns {JSX.Element} Функциональный компонент, обёрнутый в функционал обработки очереди сообщений
 */
 const WithToastify = (View) => {
    const Component = () => {
        const messageQueueSelector = useAppSelector(state => state.messageQueueReducer);
        const dispatch = useAppDispatch();
        const messageToastify = useMessageToastify();

        useEffect(() => {
            if(messageQueueSelector.queue.length > 0){
                const message = messageQueueSelector.queue[0];
                messageToastify(message.data.message, message.type);

                dispatch(messageQueueAction.removeMessage(message.uuid));
            }
        }, [messageQueueSelector]);
        
        return (
            <View />
        )
    }

    return Component;
}

export default WithToastify;