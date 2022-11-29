/* Библиотеки  */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

/* Компоненты */
import App from './containers/App';

/* Контекст */
import { useAppDispatch } from './hooks/redux';
import { authSlice } from './store/reducers/AuthSlice';
import store, {persistor} from './store/store';

/* Стили */
import './styles/normalize.css';
import './styles/index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
