import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from "redux";
import allReducer from './reducers';

const store = createStore(allReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);
