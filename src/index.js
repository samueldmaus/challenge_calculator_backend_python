import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import App from './Components/App.js'
import rootReducer from './redux/reducers/_root.reducer.js'
import rootSaga from './redux/sagas/_root.saga.js'

// create sagamiddleware
const sagaMiddleware = createSagaMiddleware();

const middlewareList = process.env.NODE_ENV === 'development' ?
    [sagaMiddleware, logger] : 
    [sagaMiddleware];

// create the store for props and add middleware
const store = createStore(
    rootReducer,
    applyMiddleware(...middlewareList)
);

sagaMiddleware.run(rootSaga);

// render the elements to the DOM at the root id
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);