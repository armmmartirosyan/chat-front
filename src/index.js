import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import reducers from "./store/reducers";
import thunk from "redux-thunk";
import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/bootstrap.min.css';
import './assets/styles/style.scss';

const store = configureStore({
    reducer: reducers,
    devTools: true,
    middleware: [thunk]
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);

reportWebVitals();
