import React, { Component } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

//initial state and set middle ware array with thunk
const initialState = {};
const middleware = [thunk];

const whichCompose = () => {
  if (window.navigator.userAgent.includes('Chrome')) {
    compose(
      applyMiddleware(...middleware),
      // Implements the Chrome redux tools extension
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  } else {
    compose(applyMiddleware(...middleware));
  }
};

const store = createStore(rootReducer, initialState, whichCompose());
export default store;
