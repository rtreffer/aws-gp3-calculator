import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';

if (!!window) {
  window.store = store;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);