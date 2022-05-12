import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import Home from './pages/home';

import store from './store';
import './styles/globals.scss';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Home />
        </Provider>
    </React.StrictMode>
);
